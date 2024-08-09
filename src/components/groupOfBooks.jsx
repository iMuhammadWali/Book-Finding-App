// import { Link, useNavigate } from 'react-router-dom';
// import '/src/App.css'

// let category = document.querySelector("#category");
// let num = 0;
// let left = 0;
// const GroupOfBooks = ({ category, books, bookCovers, isResult, query, setCurrBook }) => {

//     return (
//         <div className="category" key={category}>
//             {!isResult ? (
//                 <Link to={`/search/subject:${category}`} id="category">{category}</Link>
//             ) : (
//                 <span className="results">Search Results for "{query}"</span>
//             )
//             }
//             <div className='sub-container' key={category}>
//                 {books.map(book => {
//                     num++;
//                 (
//                     <Link style={{
//                         textDecoration: 'none'
//                         }} to={`/details/${book.volumeInfo.title}`}
//                     // }}
//                         key={book.id}
//                         className='book'
//                         onClick={() => {
//                             setCurrBook(book);
//                             // console.log('current book is', currBook);
//                             // navigate(`/details/${book.volumeInfo.title}`);
//                         }}>
//                         <img src={book.cover} />
//                         <span id="title">{book.volumeInfo.title}</span>

//                     </Link>
//                 )
//                 if (num == 1) {
//                     left = document.querySelector(".book").getBoundingClientRect().x;
                    
//                 }})}
//             </div>
//         </div>
//     )
// };
// // category.style.left = left + "px";
// export default GroupOfBooks;

import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '/src/App.css';

const GroupOfBooks = ({ category, books, bookCovers, isResult, query, setCurrBook }) => {
    const [left, setLeft] = useState(0);
    const categoryRef = useRef(null);  // Reference for the category tag

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
        if (categoryRef.current) {  // Access the DOM element using categoryRef.current
            categoryRef.current.style.marginLeft = `${left}px`;
        }
    }, [left]);

    return (
        <div className="category-container">
            {!isResult ? (
                <Link to={`/search/subject:${category}`} id="category" ref={categoryRef} className="category">
                    {category}
                </Link>
            ) : (
                <span className="results">Search Results for "{query}"</span>
            )}
            <div className='sub-container'>
                {books.map((book) => (
                    <Link 
                        style={{ textDecoration: 'none' }} 
                        to={`/details/${book.volumeInfo.title}`}
                        key={book.id}
                        className='book'
                        onClick={() => setCurrBook(book)}
                    >
                        <img src={bookCovers[book.id]} />
                        <span id="title">{book.volumeInfo.title}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default GroupOfBooks;
