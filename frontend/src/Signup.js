import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
    const navigate = useNavigate();
    
    // Define state to hold form input values
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/signup', values)
             .then(res => {
                navigate('/');
             })
             .catch(err => console.log(err));
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    }

    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="name" className="form-label"><strong>Name</strong></label>
                        <input type='text' placeholder='Enter name' name='name' value={values.name} onChange={handleInputChange} className='form-control rounded-0'/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="email" className="form-label"><strong>Email</strong></label>
                        <input type='email' placeholder='Enter email' name='email' value={values.email} onChange={handleInputChange} className='form-control rounded-0'/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password" className="form-label"><strong>Password</strong></label>
                        <input type='password' placeholder='Enter password' name='password' value={values.password} onChange={handleInputChange} className='form-control rounded-0'/>
                    </div>
                    <button className='btn btn-success w-100'>Sign up</button>
                    <Link to="/" className='btn btn-primary w-100 mt-2'>Login</Link>
                </form>
            </div>
        </div>
    );
}

export default Signup;
