import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchBookCover } from '../../JavaScript/fetchBookCover';
import { MoonLoader } from 'react-spinners';
// import 'react-spinners/MoonLoader.css'
import GroupOfBooks from './groupOfBooks';
import '/src/App.css'


export default function SearchedBooks({setCurrBook}) {
    const { query } = useParams();
    const [books, setBooks] = useState([]);
    const [covers, setBookCovers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const searchBooks = async () => {
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40`);
            const data = await response.json();
            setBooks(data.items || []);
        }
        catch (e) {
            console.log("Cannot search Books due to", e);
        }
    }
    const fetchCovers = async () => {
        const covers = {};
        const coverPromises = books.map(async (book) => {
            const coverUrl = await fetchBookCover(book);
            covers[book.id] = coverUrl;
        });
        await Promise.all(coverPromises);
        setBookCovers(covers);
        setIsLoading(false);

    };
    useEffect(() => {
        setIsLoading(true);
        searchBooks();
    }, [query]);
    useEffect(() => {
        fetchCovers();
    }, [books]);
    return (
        <div >
            {isLoading ? (<div className="loader"><MoonLoader color="#ffffff" size={50}
            /> </div>) : (
                <GroupOfBooks
                category={query}
                books={books}
                bookCovers={covers}
                isResult={true}
                query={query}
                setCurrBook={setCurrBook}
                // currBook={currBook}
                />
            )}
        </div>
    );
};
