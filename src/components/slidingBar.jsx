import React, { useState } from 'react'

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
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                zIndex: 19999,
                display: "none"
            }} onClick={closeSlidingBar}>

            </div>
            <div className="bar" style={{
                position: "fixed", height: "120%", width: "200px", backgroundColor: "white", zIndex: 20000, top: "0",
                left: "-100%",
                transition: "0.3s",
                backgroundColor: "#222120"

            }}>
            </div>
        </>
    )
}

export default SlidingBar;
