import { useState, useEffect } from 'react';
import "./componentStyles/header.css"
export default function searchBar() {

    return (
        <div className='search'>
            <input type="text" placeholder='search' />
            <span class="material-symbols-outlined">
                search
            </span>
        </div>
    )
}
