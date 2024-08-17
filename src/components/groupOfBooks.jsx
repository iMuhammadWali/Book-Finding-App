import { Link, useLocation } from 'react-router-dom';
import React, { useEffect, useState, useRef } from 'react';
import '/src/App.css';

const GroupOfBooks = ({ category, books, isResult, query, setCurrBook }) => {
    const [left, setLeft] = useState(7);
    const categoryRef = useRef(null);

    useEffect(() => {
        if (books.length > 0) {
            const firstBook = document.querySelector('.book');
            if (firstBook) {
                const leftPosition = firstBook.getBoundingClientRect().x;
                setLeft(leftPosition);
            }
        }
    }, [books]);

    useEffect(() => {
        if (categoryRef.current) {
            categoryRef.current.style.marginLeft = `${left}px`;
        }
    }, [left]);
    
    return (
        <div className="category" key={category}>
            {!isResult ? (
                <Link to={`/search/subject:${category}`} id="category" ref={categoryRef} >{category}</Link>
            ) : (
                <span className="results">Search Results for "{query}"</span>
            )}
            <div className='sub-container' key={category}>
                {books.map((book) => (
                    <Link style={{
                        textDecoration: 'none'
                    }} to={`/details/${book.volumeInfo.title}`}
                        key={book.id}
                        className='book'
                        onClick={() => {
                            setCurrBook(book);
                        }}>
                        <img src={book.cover} />
                        <span id="title">{book.volumeInfo.title}</span>
                    </Link>
                ))}
            </div>
        </div>
    )
};
export default GroupOfBooks;