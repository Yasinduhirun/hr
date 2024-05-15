import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Validation from './LoginValidation';
import './Login.css'; 

function Login() {
    const [values, setValues] = useState({
        empid: "",
        password: ""
    });

    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
        axios.post('http://localhost:8081/login', values)
             .then(res => {
                const { status, role } = res.data;
                if (status === 'success') {
                    if (role === 'admin') {
                        navigate('/admin');
                    } else if (role === 'hr') {
                        navigate('/Hr/HrDashboard');
                    } 
                    else if (role === 'employee') {
                        navigate('/Employee');
                    }
                    
                } else {
                    alert("Invalid credentials");
                }
             })
             .catch(err => console.log(err));
    }
    const handleAttendanceTrackingClick = () => {
        // Navigate to the AttendanceTracking page
        navigate('/AttendanceTracking');
    }

    return (
        <div className='login-container'>
            
            <div className='form-container  rounded'>
            <div className="upper-corner-icon" onClick={handleAttendanceTrackingClick}>
            <img src="/Images/AttendanceTracking.png" alt="Attendance Tracking" />
            </div>
            <h1 style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Login</h1> 
           
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="text" className="form-label"><strong>UserName</strong></label>
                        <input type='text' placeholder='enter username' name='empid'
                            value={values.username} onChange={handleInput} className='form-control rounded-0' />
                        {errors.username && <span className='text-danger'>{errors.username}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password" className="form-label"><strong>Password</strong></label>
                        <input type='password' placeholder='enter password' name='password' autoComplete='off'
                            value={values.password} onChange={handleInput} className='form-control rounded-0' />
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>
                    <button type='submit' className='btn btn-success w-100' >Login</button>
                    {/* <Link to={"/signup"} className='btn btn-primary w-100 mt-2'>Signup page</Link> */}
                </form>
            </div>
        </div>
    )
}

export default Login;