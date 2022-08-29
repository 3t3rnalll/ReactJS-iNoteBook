import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Navbar = (props) => {
    let location = useLocation();
    const navigator = useNavigate();
    const handleLogOut = () => {
        localStorage.removeItem('token');
        props.showAlert('Logged Out Successfully', 'success')
        navigator('/login')
    }

    useEffect(() => {
        // ga.send(["pageview", location.pathname]);
        // eslint-disable-next-line
    }, [location]);
    return (
        <div >
            <nav className="navbar navbar-expand-lg bg-light fixed-top" >
                <div className="container-fluid" >
                    <Link className="navbar-brand" to="/">iNoteBook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} aria-current="page" to="/about">About</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token') // eslint-disable-next-line
                            ? <form className="d-flex" role="login/signup">
                                <Link className="btn btn-primary" to="/login" role="button">LogIn</Link>
                                <Link className="btn btn-primary mx-2" to="/signup" role="button">SignUp</Link>
                            </form> : <button className="btn btn-primary mx-2" onClick={handleLogOut} >Log Out</button>}
                    </div>
                </div>
            </nav ></div >
    )
}

export default Navbar