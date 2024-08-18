import React, { useState } from 'react'
import SlidingBar, { closeSlidingBar, openSlidingBar } from './slidingBar';
import NavBar from './navBar';
import './componentStyles/header.css'
import { Link, useNavigate } from 'react-router-dom';


export default function Header() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSearchIconKeyPress = () => {
        if (window.innerWidth <= 455) {
            const logoImg = document.querySelector('.logo img');
            const input = document.querySelector('input');
            if (logoImg.style.display === 'none') {
                logoImg.style.display = 'block';
                input.style.display = 'none';
                navigate(`/search/${query}`);
            } else {
                input.style.display = 'block';
                logoImg.style.display = 'none';
            }
        } else {
            navigate(`/search/${query}`);
        }
    }
    const handleKeyPress = async (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            console.log(`${query} is asked for`);
            navigate(`/search/${query}`);
        }
    }
    return (
        <header >
            <Link className="logo" to="/">
                <img src="/logo.png" alt="" />
                {/* BookWave */}
            </Link>
            <form className="search-bar">
                <input type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value)
                    }}
                    onKeyPress={handleKeyPress}
                    placeholder="Search for books..." />
                <span className="material-symbols-outlined" onClick={handleSearchIconKeyPress}>
                    search
                </span>
            </form>
            <NavBar />
        </header>
    )
}
