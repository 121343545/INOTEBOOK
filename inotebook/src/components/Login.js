import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";
const Login = () => {
    let navigate=useNavigate();
    const [credentials, setCredentials] = useState({email:"",password:""})
    const handleSubmit=async (e)=>{

         e.preventDefault(); 
         const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
    
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlZThmMGI4NmU1YzQ5NDZkM2I3NWQ1In0sImlhdCI6MTY1OTgwMTM1NX0.NdR38S1oby9mSzl1zTH-LYYavsJGjwq6OWsPP_q3YvI"
            
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password})
            
            
    
            
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
        //redirect
        console.log("success")
        localStorage.setItem('token',json.authtoken);
        navigate('/');
        }
        else{
            console.log("wrong credentials");
            alert("Invalid credentials")
        }
    }
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name="password"/>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login