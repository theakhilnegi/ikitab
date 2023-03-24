import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    let navigate = useNavigate();
    const [cred, setCred] = useState({ email: "", password: "" });
    const onChange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: e.target[0].value, password: e.target[1].value }),
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            props.showAlert("Logged In Successfully", "success");
            navigate("/");
        } else {
            props.showAlert(json.error, "danger");
        }
    }
    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" id="email" aria-describedby="emailHelp" value={cred.email} onChange={onChange} minLength={5} required />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={cred.password} onChange={onChange} name="password" id="password" minLength={5} required />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
