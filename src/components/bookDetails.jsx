import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './componentStyles/bookDetails.css';
import { useLocation } from 'react-router-dom';

let paragraphOne = '';
let paragraphTwo = '';
let cKey = 1;

function addNewLineAfterSomeWords(paragraph) {
    paragraphOne = '';
    paragraphTwo = '';
    if (!paragraph) {
        paragraphOne = 'No Description Available';
        return;
    }
    let isParaOne = true;
    const words = paragraph.split(' ');
    let currentWordCount = 0;
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        if (isParaOne) paragraphOne += word + ' ';
        else paragraphTwo += word + ' ';
        currentWordCount++;
        if (currentWordCount >= parseInt(words.length / 2.3) && word.endsWith('.')) {
            isParaOne = false;
        }
    }
}

function BookInfo({ book }) {
    cKey = 1;
    
    // Add fallback for the description
    const description = book.volumeInfo?.description;
    addNewLineAfterSomeWords(description);

    useEffect(() => {
        let readMoreButton = document.querySelector(".readMore");
        let showLessButton = document.querySelector(".showLess");
        let description = document.querySelector(".description");
        let text = document.querySelector(".text");

        if (text.scrollHeight > text.clientHeight) {
            readMoreButton.style.display = "block"; // Show "Read More" button
        } else {
            readMoreButton.style.display = "none"; // Hide "Read More" button if not needed
        }

        readMoreButton.addEventListener("click", () => {
            description.style.height = "auto";
            showLessButton.style.display = "block";
            description.style.maxHeight = "none";
            text.style.maxHeight = "none";
            readMoreButton.style.display = "none";
        });
        showLessButton.addEventListener("click", () => {
            description.style.maxHeight = "240px";
            text.style.maxHeight = "181px";
            showLessButton.style.display = "none";
            readMoreButton.style.display = "block";
        });
    }, []);

    return (
        <div className="right">
            <span className='title'>{book.volumeInfo?.title || "Title not available"}</span>
            <div className='author'>
                {book.volumeInfo?.authors?.length > 0 ? (
                    book.volumeInfo.authors.map((author, index) => (
                        <span key={index}>
                            {author}
                            {index !== book.volumeInfo.authors.length - 1 && `, `}
                        </span>
                    ))
                ) : (
                    <span>Author not available</span>
                )}
            </div>
            <span className="vitals">Published date: {book.volumeInfo?.publishedDate || "Date not available"}</span>
            <span className="vitals">Page count: {book.volumeInfo?.pageCount || "No page count available"}</span>
            <div className="description">
                <div className="text">
                    {paragraphOne} <br />
                    <p>{/* Used for space */}</p>{paragraphTwo}
                    <br />
                </div>
                <span className="readMore">Read More</span>
                <span className="showLess">Show Less</span>
            </div>
            <div className="cats">
                {book.volumeInfo?.categories?.length > 0 ? (
                    book.volumeInfo.categories.map(category => (
                        <div key={cKey++} className="cat">
                            <Link style={{ textDecoration: "none", color: "white" }}>
                                {category}
                            </Link>
                        </div>
                    ))
                ) : (
                    <span>No categories available</span>
                )}
            </div>
        </div>
    );
}


function BookDetails({ book }) {
    const [currentBook, setCurrentBook] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { title } = useParams();
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    // let currentBook = book;

    useEffect(() => {
        // If no book is passed as a prop, fetch it
        if (!book || Object.keys(book).length === 0) {
            console.log("Haahaa")
            const fetchBook = async () => {
                setIsLoading(true);
                try {
                    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${title}&maxResults=1`);
                    const data = await response.json();
                    if (data.items && data.items.length > 0) {
                        // setBookAlt(data.items[0]);
                        setIsLoading(false);
                        setCurrentBook(data.items[0])
                        console.log("currentBook is:", currentBook);
                        // currentBook = 
                    }
                } catch (error) {
                    console.error('Failed to fetch book details:', error);
                }
            };
            fetchBook();
        }
        else {
            setCurrentBook(book)
        }
    }, [title, book]);


    return (
        <div className="main-cont" style={{ color: "white" }}>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                currentBook ? (
                    <div className="book-container">
                        <div className="left">
                            <div className="image">
                                <img src={currentBook.volumeInfo?.imageLinks?.thumbnail || "/defaultCover.jpg"} alt="" />
                            </div>
                        </div>
                        <BookInfo book={currentBook} />
                    </div>
                ) : (
                    <p>No book details available</p>
                )
            )}
        </div>
    );
}

export default BookDetails;