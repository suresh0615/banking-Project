import React, { useState, useContext } from "react";
import Mycontext from "./Mycontext";
import "bootstrap/dist/css/bootstrap.min.css";
import './login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const ctx = useContext(Mycontext);

    function Submit(e) {
        e.preventDefault();
        console.log('login Consoles start');
        console.log("Before login user", ctx.users);
        console.log("Before login", ctx.currentUser);

        // Check if there's already a user logged in
        if (ctx.currentUser.length > 0) {
            alert('Please log out current account to log in with a new account');
            return;
        }

        const adminUser = ctx.users.find(u => u.email === email && u.password === password && u.isAdmin);
        if (adminUser) {
            ctx.currentUser.push(adminUser);
            alert('Admin successfully logged in');
        } else {
            const user = ctx.users.find(u => u.email === email && u.password === password);
            if (user) {
                ctx.currentUser.push(user);
                alert('User successfully logged in');
            } else {
                alert('Invalid email or password');
            }
        }

        console.log("after login", ctx.currentUser);
        console.log('login Consoles end');
    }

    function logout(e) {
        e.preventDefault();
        ctx.currentUser.pop();
        alert('Logged out');
        console.log('After delete:', ctx.currentUser);
    }

    return (
        <div className="app">
            <div className="login-form">
                <div className="title">Login</div>
                <div className="form">
                    <form>
                        <div className="input-container">
                            <label>User Email: </label>
                            <input type="text" name="uname" required value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="input-container">
                            <label>Password: </label>
                            <input type="password" name="pass" required value={password} onChange={e => setPassword(e.target.value)} />
                        </div>
                        <div className="button-container">
                            <button onClick={Submit}>Login</button>
                            {/* <button id="logout" onClick={logout}>Logout</button> */}
                        </div>
                        <br />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
