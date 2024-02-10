import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {

    const [values, setValues] = useState({
        email:'',
        password:''
    });

    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8081/login', values)
        .then((res) => {
            if(res.data.status === "success"){
                navigate('/');
            } else {
                alert(res.data.Error);
            }
        })
        .catch((err) => {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
        });
    };


  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-25'>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email"><strong>Email</strong></label>
                    <input type="email" name="email" placeholder="Enter Email" className='form-control rounded-0'
                    onChange={e => setValues({ ...values, email: e.target.value})}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="password"><strong>Password</strong></label>
                    <input type="password" name="password" placeholder="Enter Password" className='form-control rounded-0'
                    onChange={e => setValues({ ...values, password: e.target.value})}/>
                </div>

                <button type="submit" className='btn btn-success w-100 rounded-0 mb-2'>Login</button>
                <p className='mb-3'>You are agreeing to our terms and conditions.</p> 
                <h6>Not a user, then register yourself by creating account?</h6>
                <Link to={'/register'} className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create Account</Link>
            </form>
        </div>
    </div>
  )
}

export default Login;