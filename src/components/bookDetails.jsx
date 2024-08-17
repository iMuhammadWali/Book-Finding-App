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
    addNewLineAfterSomeWords(book.volumeInfo.description);

    useEffect(() => {
        let readMoreButton = document.querySelector(".readMore");
        let showLessButton = document.querySelector(".showLess");
        let description = document.querySelector(".description");
        let text = document.querySelector(".text");
        readMoreButton.addEventListener("click", () => {
            description.style.height = "auto";
            // span.style.marginTop = "15px"; 
            showLessButton.style.display = "block";
            description.style.maxHeight = "none";
            text.style.maxHeight = "none";
            readMoreButton.style.display = "none";
        });
        showLessButton.addEventListener("click", () => {
            console.log("Worked");
            description.style.maxHeight = "240px";
            text.style.maxHeight = "200px";
            showLessButton.style.display = "none";
            readMoreButton.style.display = "block";
        }); 
    })

    return (
        <div className="right">
            <span className='title'>{book.volumeInfo?.title}</span>
            <div className='author'>
                {book.volumeInfo.authors.map((author, index) => (
                    <span key={index}>
                        {author}
                        {index !== book.volumeInfo.authors.length - 1 && `, `}
                    </span>
                ))}
            </div>
            <span className="vitals">Published date: {book.volumeInfo.publishedDate}</span>
            <span className="vitals">Page count: {book.volumeInfo.pageCount || "No page count available"}</span>
            <div className="description">
                <div className="text">
                    {paragraphOne} <br />
                    <p>      {/*Used for space */}</p>{paragraphTwo}
                    <br />
                </div>
                <span className="readMore">Read More</span>
                <span className="showLess">Show Less</span>

            </div>
            <div className="cats">
                {book.volumeInfo.categories.map(category => (
                    <div key={cKey++} className="cat">
                        <Link style={{ textDecoration: "none", color: "white" }}>
                            {category}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

function BookDetails({ book }) {
    const [bookAlt, setBookAlt] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { title } = useParams();
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        // If no book is passed as a prop, fetch it
        if (!book) {
            const fetchBook = async () => {
                setIsLoading(true);
                try {
                    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${title}&maxResults=1`);
                    const data = await response.json();
                    if (data.items && data.items.length > 0) {
                        setBookAlt(data.items[0]);
                    }
                } catch (error) {
                    console.error('Failed to fetch book details:', error);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchBook();
        }
    }, [title, book]);

    const currentBook = book || bookAlt;

    return (
        <div className="main-cont" style={{ color: "white" }}>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                currentBook ? (
                    <div className="book-container">
                        <div className="left">
                            <div className="image">
                                <img src={currentBook?.volumeInfo?.imageLinks?.thumbnail || "/src/defaultCover.jpg"} alt="" />
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