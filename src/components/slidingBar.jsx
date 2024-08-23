import React, { useState } from 'react'
import NavBar from './navBar';
import { Link } from 'react-router-dom';
import "./componentStyles/slidingBar.css";

export function openSlidingBar() {
    let slidingBar = document.querySelector(".bar");
    let overlay = document.querySelector(".overlay");
    slidingBar.style.left = "0%";
    overlay.style.display = "block";
}

export function closeSlidingBar() {
    let slidingBar = document.querySelector(".bar");
    let overlay = document.querySelector(".overlay");
    slidingBar.style.left = "-100%";
    overlay.style.display = "none";
}
function SlidingBar() {
    return (
        <>
            <div className="overlay" style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "120%",
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                // backdropFilter: "blur(1px)" ,
                zIndex: 1999,
                display: "none"
            }} onClick={closeSlidingBar} >
            </div >
            <div className="bar" style={{
                position: "fixed", height: "120%", width: "80%", zIndex: 2000, top: "0",
                left: "-100%",
                transition: "0.3s",
                backgroundColor: "#222120",
            }}>
                {/* <NavBar /> */}
                {/* I can import the navbar component here but i prefer to do this to leaen how this actually works */}
                <div className="nav">
                    <li><Link to="/" className="link">Home</Link></li>
                    <li><Link to="/toRead" className="link">Readpile</Link></li>
                    <li><Link to="/completed" className="link">Completed</Link></li>
                </div>
            </div>
        </>
    )
}

export default SlidingBar;
