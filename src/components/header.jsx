import React, { useState } from 'react'
import SlidingBar, { closeSlidingBar, openSlidingBar } from './slidingBar';
import NavBar from './navBar';
import './componentStyles/header.css'
import { Link, useNavigate } from 'react-router-dom';


export default function Header() {
    const [query, setQuery] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);
    const navigate = useNavigate();

    const handleSearchIconKeyPress = () => {
        const logoImg = document.querySelector('.logo img');
        const input = document.querySelector('input');
        const searchBar = document.querySelector('.search-bar');
        if (isExpanded) {
            searchBar.style.width = "0%"
            logoImg.style.opacity = '1';
            setTimeout(() => {
                input.placeholder = "";
            }, 150);

            if (query)
                navigate(`/search/${query}`);
        } else {
            searchBar.style.width = "82%";
            input.placeholder = "Search for books...";
            logoImg.style.opacity = '0';
            input.focus();
        }
        setIsExpanded(!isExpanded);
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
            <NavBar />
            <form className="search-bar">
                <input type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value)
                    }}
                    onKeyPress={handleKeyPress}
                    placeholder="" />
            </form>
            <span className="material-symbols-outlined" onClick={handleSearchIconKeyPress}>
                search
            </span>
        </header>
    )
}
