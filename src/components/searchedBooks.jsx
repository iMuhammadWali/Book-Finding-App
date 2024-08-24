import React, { useEffect, useState } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import { MoonLoader } from 'react-spinners';
import GroupOfBooks from './groupOfBooks';
import '/src/App.css'

export default function SearchedBooks({ setCurrBook }) {
    const { query } = useParams();
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    const searchBooks = async () => {
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=AIzaSyBnJuSKder628NvC8sCoWPH6JC70j9NfJs&maxResults=40`);
            const data = await response.json();
            setBooks(data.items || []);
        }
        catch (e) {
            console.log("Cannot search Books due to", e);
        }
    }

    useEffect(() => {
        setIsLoading(true);
        searchBooks();
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, [query]);

    return (
        <div >
            {isLoading ? (<div className="loader"><MoonLoader color="#ffffff" size={30}
            /> </div>) : (
                <GroupOfBooks
                    category={query}
                    books={books}
                    isResult={true}
                    query={query}
                    setCurrBook={setCurrBook}
                />
            )}
        </div>
    );
};
