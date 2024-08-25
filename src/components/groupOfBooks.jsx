import { Link, useLocation } from 'react-router-dom';
import React, { useEffect, useState, useRef } from 'react';
import '/src/App.css';

const GroupOfBooks = ({ category, books, isResult, query, setCurrBook, isNuces }) => {
    const [left, setLeft] = useState(0);
    const categoryRef = useRef(null);
    let margin = "20px";
    if (isNuces) margin = "120px";
    console.log(margin, 'is the margin of search results');

    useEffect(() => {
        if (books.length > 0) {
            const firstBook = document.querySelector('.book');
            if (firstBook) {
                const leftPosition = firstBook.getBoundingClientRect().x - 5;
                console.log('left posi =', leftPosition);
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
            ) : (isNuces ? (
                <span className="results" style={{ marginTop: "100px" }}>FAST-NUCES Books</span>
            ) : (<span className="results" style={{ marginTop: margin }}>Search Results for "{query}"</span>)
            )}
            {/* {(books.length > 0) ? ( */}
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
                            <img src={book.volumeInfo?.imageLinks?.thumbnail || "/defaultCover.jpg"} />
                            <span id="title">{book.volumeInfo.title}</span>
                        </Link>
                    ))}
                </div>
                {/* ) : (<span>No Nuces Book Found</span>)} */}
        </div>
    )
};
export default GroupOfBooks;