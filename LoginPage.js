import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

import '../../App.css'

export default function SignInPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory(); // Access history object

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission
        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id:username,
                    password:password,
                }),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
                if(responseData.message==="Login Success") {
                    history.push('/home');
                } else {
                    console.log("Login failed");
                    alert(responseData.message);
                }

            } else {
                alert("API Error");
                console.error('API Server error');
            }
        } catch (error) {
            // Handle network errors or other exceptions
            console.error('Error during login:', error);
        }
    };

    return (
        <div className="text-center m-5-auto">
            <h2>Sign in to us</h2>
            {/* <form action="/home"> */}
            <form onSubmit={handleLogin}>
                <p>
                    <label>Username or email address</label><br/>
                    {/* <input type="text" name="first_name" required /> */}
                    <input type="text" name="username" required value={username} onChange={(e) => setUsername(e.target.value)} />
                </p>
                <p>
                    <label>Password</label>
                    <Link to="/forget-password"><label className="right-label">Forget password?</label></Link>
                    <br/>
                    {/* <input type="password" name="password" required /> */}
                    <input type="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </p>
                <p>
                    <button id="sub_btn" type="submit">Login</button>
                </p>
            </form>
            <footer>
                <p>First time? <Link to="/register">Create an account</Link>.</p>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )
}
