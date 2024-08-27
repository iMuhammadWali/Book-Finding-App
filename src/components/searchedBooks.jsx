import React, { useEffect, useState } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import { MoonLoader } from 'react-spinners';

import NUCES_Books from '../../data/nucesBooks';
import GroupOfBooks from './groupOfBooks';
import '/src/App.css';
let gKey = 1;
const API_Key = import.meta.env.VITE_API_KEY;
//I may add the function if current book is not passed a prop so that it searches for FAST Book's exact title first and if it is found, show 

export default function SearchedBooks({ setCurrBook }) {
    const { query } = useParams();
    const [books, setBooks] = useState([]);
    const [nucesBooks, setNucesBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    const searchNucesBooks = () => {
        const fastBooks = new Set();
        const queryLower = query.toLowerCase();
        // const queryWords = query.toLowerCase().split(' ');

        NUCES_Books.forEach(book => {
            const normalizedTitle = book.volumeInfo.title.toLowerCase();
            const categories = book.volumeInfo.categories || []; // Ensure categories exist

            const titleMatches = normalizedTitle.includes(queryLower);
            const categoryMatches = categories.some(category => category.toLowerCase().includes(queryLower));

            // Add book if it matches either title or category
            if (titleMatches || categoryMatches) {
                fastBooks.add(book);
            }

        });

        setNucesBooks([...fastBooks]);
        console.log(nucesBooks);
    }

    const searchBooks = async () => {
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_Key}&maxResults=40`);
            const data = await response.json();
            setBooks(data.items || []);
        }
        catch (e) {
            console.log("Cannot search Books due to", e);
        }
    }

    useEffect(() => {
        setIsLoading(true);
        searchNucesBooks();
        searchBooks();
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    }, [query]);

    return (
        <div >
            {isLoading ? (<div className="loader"><MoonLoader color="#ffffff" size={30}
            /> </div>) : (
                <>
                    {nucesBooks.length > 0 ? (
                        <>
                            {console.log('Rendering GroupOfBooks with isNuces = true')}
                            <GroupOfBooks
                                key={gKey++}
                                category={query}
                                books={nucesBooks}
                                isResult={true}
                                query={query}
                                setCurrBook={setCurrBook}
                                isNuces={true}
                                isFAST={true}
                            />
                        </>
                    ) : null}
                    {console.log('Rendering GroupOfBooks with isNuces = false')}
                    <GroupOfBooks
                        key={gKey++}
                        category={query}
                        books={books}
                        isResult={true}
                        query={query}
                        setCurrBook={setCurrBook}
                        isNuces={(nucesBooks.length > 0)}
                        isFAST={false}
                    />
                </>
            )}
        </div>
    );
};
