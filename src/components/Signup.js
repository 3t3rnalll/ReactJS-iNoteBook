import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const host = 'http://localhost:5000';

const Signup = (props) => {

    let navigator = useNavigate();

    const [credentials, setCredentials] = useState({ user: '', email: '', password: '', cpassword: '' })

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (credentials.password !== credentials.cpassword) {
            props.showAlert("Passwords doesn't match", "warning")
        }
        else {
            const response = await fetch(`${host}/api/auth/createuser`, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: credentials.user, email: credentials.email, password: credentials.password === credentials.cpassword ? credentials.password : '' })
            });
            const json = await response.json();
            console.log(json);
            if (json.success) {
                localStorage.setItem('token', json.token);
                navigator('/')
                props.showAlert('Signed Up Successfully', 'success');
            }
            else if (json.emailSuccess && !json.success)
                props.showAlert('Email or Password is invalid', 'danger');
            else
                props.showAlert('Please Enter a Valid Email Address', 'danger');
        }
    }
    return (
        <div style={{ padding: '15vh' }}>
            <h2 className='my-3'>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="user" name='user' value={credentials.user} placeholder="Password" onChange={onChange} required minLength={3} />
                    <label htmlFor="floatingInput">Username</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="email" placeholder="name@example.com" name='email' value={credentials.email} onChange={onChange} required />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating my-3">
                    <input type="password" className="form-control" id="password" placeholder="Password" name='password' value={credentials.password} onChange={onChange} required minLength={7} />
                    <label htmlFor="Password">Password</label>
                </div>
                <div className="form-floating my-3">
                    <input type="password" className='form-control' id="cpassword" placeholder="Password" name='cpassword' value={credentials.cpassword} onChange={onChange} required minLength={7} />
                    <label htmlFor="Password">Confirm Password</label>
                </div>
                <div className='my-3'>
                    <button type="submit" className="btn btn-primary"  >Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Signup