import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

import { NavLink } from 'react-router-dom';



function AppContainer(props) {
    return (
        <>
            <header>
                <nav>
                    <ul>
                        <li>
                        <NavLink
                            to="/products"
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "active" : ""
                            }
                            >
                            Products
                        </NavLink>
                        </li>
                        <li>
                            <Link to="/wishlist">Wishlist</Link>
                        </li>
                        <li>Cart</li>
                    </ul>
                </nav>
            </header>
            {props.children}
        </>
    )
}

AppContainer.propTypes = {
    children: PropTypes.node.isRequired,
}
export default AppContainer;