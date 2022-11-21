import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {

    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" })

    const handleSubmit = async (e) => {
        const { name, email, password } = credentials;
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.

            headers: {
                'Content-Type': 'application/json',

            },
            /*body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})*/
            body: JSON.stringify({ name, email, password })



        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            //redirect
            console.log("success")
            localStorage.setItem('token', json.authtoken);
            navigate('/');
        }
        else {
            console.log("wrong credentials");
            alert("Invalid credentials")
        }

    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={onChange} />

                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">email</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={onChange} />

                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" id="password" className="form-control" onChange={onChange} minLength={5} required />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup