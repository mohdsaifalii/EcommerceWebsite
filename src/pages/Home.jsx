/*
    fetch("https://fakestoreapi.in/api/products")
.then(res => res.json())
.then(res => console.log(res))


*/
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Card, Image, Text, Badge, Button, Group, Space, Pagination, Select, Notification, NumberInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
const Home = () => {
    const wishlist = JSON.parse(localStorage.getItem("airtribe-user-wishlist"));
    const [products, setProducts] = useState([]);
    const [wishlistState, setWishlist] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [limit, setLimit] = useState(10);
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
        async function fetchData() {
            const data = await fetch(`https://fakestoreapi.in/api/products?page=${activePage}&limit=${limit}`);
            const dataJson = await data.json();
            setProducts(dataJson.products);
        }
        fetchData();
    }, [activePage, limit])
    useEffect(() => {
        setWishlist(wishlist);
    },[wishlist])
    const handleAddToWishList = (e, product) => {
        e.stopPropagation();
        // Check if user is authenticated or not
        const isAuth = localStorage.getItem('airtribe-user-auth');
        if (!isAuth || isAuth !== 'authenticated' ) {
            notifications.show({
                title: 'Unauthrorized',
                message: 'Please login',
                color: "red"
            })
            return;
        }
        const wishlist = JSON.parse(localStorage.getItem('airtribe-user-wishlist'));
        if (!wishlist) {
            let newWishlist = [];
            newWishlist.push(product);
            localStorage.setItem('airtribe-user-wishlist', JSON.stringify(newWishlist));
            notifications.show({
                title: 'Added to wishlist!',
                color: "green",
                position: "top-center"
            })
            return true;
        }
        if (wishlist.length) {
            const modifiedWishlist = [...wishlist];
            modifiedWishlist.push(product);
            localStorage.setItem('airtribe-user-wishlist', JSON.stringify(modifiedWishlist));
            notifications.show({
                title: 'Added to wishlist!',
                color: "green",
                position: "top-center"
            })
            return true;
        }
    }
    return (
        <>
        
           
            <Space h="xl" />
            <Group align="center" gap={5}>
                                <Button>+</Button>
                                <NumberInput/>
                                <Button>-</Button>
                            </Group>
            <Group gap={5} justify="center">
                <Pagination value={activePage} onChange={setActivePage} total={Math.ceil(500 / limit)} />
                <Select
                    value={limit}
                    onChange={setLimit}
                    placeholder="Set Limit"
                    data={['10', '20', '30', '40', '50']}
                 />
            </Group>
            <Space h="xl" />   
        </>
     );
}
 
export default Home;

