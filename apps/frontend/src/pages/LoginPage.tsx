import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { loginRequest } from "../api/api";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, signup } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async () => {
        await login(email, password);
        const idToken = localStorage.getItem("idToken");
        if (idToken) await loginRequest(idToken);
        navigate("/tasks");
    };

    const handleSignup = async () => {
        await signup(email, password);
        const idToken = localStorage.getItem("idToken");
        if (idToken) await loginRequest(idToken);
        navigate("/tasks");
    };

    return (
        <div className="login-container">
            <h1>Login or Signup</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleSignup}>Sign Up</button>
        </div>
    );
};

export default LoginPage;
