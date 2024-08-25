import React, { useEffect, useState } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import { MoonLoader } from 'react-spinners';

import NUCES_Books from '../../data/nucesBooks';
import GroupOfBooks from './groupOfBooks';
import '/src/App.css';

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
        const fastBooks = new Set();  // Use Set to avoid duplicates
        const queryWords = query.toLowerCase().split(' ');  // Split the query into words

        NUCES_Books.forEach(book => {
            const normalizedTitle = book.volumeInfo.title.toLowerCase();  // Normalize the title

            queryWords.some(q => {  // Use `some` to find any matching word
                if (normalizedTitle.includes(q)) {
                    fastBooks.add(book);  // Add the book if a match is found
                    return true;  // Break the loop for this book
                }
                return false;
            });
        });

        setNucesBooks([...fastBooks]);  // Convert Set to Array before setting state
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
        searchBooks();
        searchNucesBooks();
        // setTimeout(() => {
            setIsLoading(false);
        // }, 1000);
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
                                key={1}
                                category={query}
                                books={nucesBooks}
                                isResult={true}
                                query={query}
                                setCurrBook={setCurrBook}
                                isNuces={true}
                                isFAST= {true}
                            />
                        </>
                    ) : null}
                    {console.log('Rendering GroupOfBooks with isNuces = false')}
                    <GroupOfBooks
                        key={2}
                        category={query}
                        books={books}
                        isResult={true}
                        query={query}
                        setCurrBook={setCurrBook}
                        isNuces={(nucesBooks.length > 0)}
                        isFAST= {false}
                    />
                </>
            )}
        </div>
    );
};
