// required and minimum is only be use with onSubmit not with onClick

import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
    let navigate = useNavigate();
    const [cred, setCred] = useState({ name: "", email: "", password: "", cpassword: "" });
    const onChange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: cred.name, email: cred.email, password: cred.password }),
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            props.showAlert("Acount Created Successfully", "success");
            navigate("/");
        } else {
            props.showAlert(json.error, "danger");
        }
    }
    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" id="name" value={cred.name} onChange={onChange} minLength={3} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" id="email" aria-describedby="emailHelp" value={cred.email} onChange={onChange} minLength={5} required />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={cred.password} onChange={onChange} name="password" id="password" minLength={5} required /> <div className="form-text">Password should at least 5 characters</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Conform Password</label>
                    <span className={`mx-2 text-success ${(cred.cpassword === cred.password && cred.password.length !== 0) ? '' : 'd-none'}`}>Match</span>
                    <input type="password" className="form-control" value={cred.cpassword} onChange={onChange} name="cpassword" id="cpassword" minLength={5} required />
                </div>
                <button disabled={(cred.cpassword !== cred.password) ? true : false} type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Signup;