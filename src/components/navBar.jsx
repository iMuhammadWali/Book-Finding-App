import React, { useState } from 'react'
import SlidingBar, {closeSlidingBar, openSlidingBar} from './slidingBar';
// import NavBar from './navBar';
import './componentStyles/header.css'
import { Link, useNavigate } from 'react-router-dom';

import './componentStyles/header.css'
function NavBar() {
    return (
        <nav className="nav-bar">
            <img onClick={openSlidingBar} src="/menu.png" alt="Menu" />
            <li><Link to="/" className="li">Home</Link></li>
            <li><Link to="/readPile" className="li">Readpile</Link></li>
            <li><Link to="/completed" className="li">Completed</Link></li>
            {/* <li><Link to="https://mhdwali.netlify.app" className="li">About Me</Link></li> */}
            <li>
                <Link 
                    to="https://mhdwali.netlify.app" 
                    className="li" 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    About Me
                </Link>
            </li>

        </nav>
    )
}

export default NavBar;