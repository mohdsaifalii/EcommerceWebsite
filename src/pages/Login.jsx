import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const submit = (e) => {
        e.preventDefault();
        
        // Get form values
        const email = e.target.email.value.trim();
        const password = e.target.password.value.trim();
        
        if (!email || !password) {
            setError('Both fields are required.');
            return;
        }

        const payload = { email, password };
        const dummyPayload = {
            email: "airtribe@gmail.com",
            password: 'test'
        };

        if (payload.email === dummyPayload.email && payload.password === dummyPayload.password) {
            localStorage.setItem('airtribe-user-auth', 'authenticated');
            navigate('/products', {
               replace: true,
            });
        } else {
            setError('Invalid Credentials');
        }
    };

    return ( 
        <form onSubmit={submit}>
            <input type="email" name="email" placeholder="Enter your email" />
            <input type="password" name="password" placeholder="Enter your password" />
            <button type="submit">Login</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
     );
};
 
export default Login;
