import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {

    const [values, setValues] = useState({
        name:'',
        email:'',
        password:''
    });

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8081/register', values)
        .then((res) => {
            if(res.data.status === "success"){
                navigate('/login');
            } else {
                alert("Error in registration...");
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
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name"><strong>Name</strong></label>
                    <input type="text" name="name" placeholder="Enter Name" className='form-control rounded-0'
                    onChange={e => setValues({ ...values, name: e.target.value})}/>
                </div>

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

                <button type="submit" className='btn btn-success w-100 rounded-0 mb-2'>Register</button>
                <p className='mb-3'>You are agreeing to our terms and conditions.</p>
                <h6>Already user, then just log into your account?</h6>
                <Link to={'/login'} className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>
            </form>
        </div>
    </div>
  )
}

export default Register;