import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const host = 'http://localhost:5000'
const Login = (props) => {

    const [credentials, setCredentials] = useState({ email: '', password: '' })

    let navigator = useNavigate();

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem('token', json.token);
            navigator('/')
            props.showAlert('Logged In Successfully', 'success');
        }
        else if (json.emailSuccess && !json.success)
            props.showAlert('Email or Password is invalid', 'danger');
        else
            props.showAlert('Please Enter a Valid Email Address', 'danger');

    }
    return (
        <div style={{ padding: '24vh' }}>
            <h1>Login to iNoteBook</h1>
            <form onSubmit={handleSubmit} className='my-3' >
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email' placeholder="name@example.com" value={credentials.email} onChange={onChange} required />
                    <label htmlFor="exampleInputEmail1" className="form-label">Email Address</label>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" id='password' name='password' className="form-control" value={credentials.password} placeholder="Password" onChange={onChange} required minLength={7} />
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                </div>
                <button type="submit" className="btn btn-primary"  >Submit</button>
            </form>
        </div>
    )
}

export default Login