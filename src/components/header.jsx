import React, { useState } from 'react'
import './componentStyles/header.css'
import { Link, useNavigate } from 'react-router-dom';


export default function Header() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
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
                <span className="material-symbols-outlined" //if (window.width <= 410px) onClick ={//expand the navbar}
                >
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
