import React, { useState } from 'react'
import './componentStyles/header.css'
import { Link, useNavigate } from 'react-router-dom';


export default function Header() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    // const [logoRef, setLogoRef] = useState(null);
    const handleSearchIconKeyPress = () => {
        if (window.innerWidth <= 455) {
            const logoImg = document.querySelector('.logo img');
            const logo = document.querySelector('.logo');
            const input = document.querySelector('input');
            if (logoImg.style.display === 'none'){
                logoImg.style.display = 'block';
                // logo.style.width = '160px';
                input.style.display = 'none';
            } else {
                input.style.display = 'block';
                // logo.style.width = '80px';
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
            <nav>
                <img src="/menu.png" alt="" />
                <li><Link to="/" className="li">Home</Link></li>
                <li><Link to="/toRead" className="li">Readpile</Link></li>
                <li><Link to="https://mhdwali.netlify.app" className="li">Completed</Link></li>
            </nav>
        </header>
    )
}
