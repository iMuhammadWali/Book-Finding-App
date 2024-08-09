import React, { useEffect, useState } from 'react'
import { fetchBookCover } from '../../JavaScript/fetchBookCover';
import { useParams } from 'react-router-dom'
import "./componentStyles/bookDetails.css"
// import "/src/App.css"

function BookInfo({ book }) {
    return (
        <div className="info">

            {/* Title */}
            <span className='title'>
                <span className="bold">Title :</span> {book.volumeInfo?.title}
            </span> 
            {/* Authors */}
            <span className="author"> <span className="bold">Author/Authors : </span>
            {
                book.volumeInfo.authors.map(author => (
                    <span className='author'>{author}</span>
                ))
            }
            </span>
            {/* Date */}
            <span className="vitals">
                <span style={{ fontWeight: "bold" }}>Published date :</span> {book.volumeInfo.publishedDate}
            </span> 

            <span className="vitals">
                <span style={{ fontWeight: "bold" }}>Page count :</span> {book.volumeInfo.pageCount || "No page count available"}
            </span> 
            <span className="description">
            <span style={{ fontWeight: "bold" }}>Description :</span> {book.volumeInfo.description || "No description available"}
            </span>
            <span className="vitals">
            <span style={{ fontWeight: "bold"}}>Categories :</span>
            {
                book.volumeInfo.categories.map(category => (
                    <span style={{
                        marginLeft:"30px", marginTop: "10px"
                    }}className='category'>{category}</span>
                ))
            }
            </span>
        </div>
    )
}
function BookDetails({ book }) {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { title } = useParams();

    console.log(book, 'is asked for');

    // const fetchBookAgain = async () => {
    //     setIsLoading(true);
    //     const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${title}&maxResults=1`)
    //     const data = await response.json();
    //     // setBooks(data.items);
    //     book = data.item;
    //     setIsLoading(false);
    // }
    // if (!book) {
    //     useEffect(() => {
    //         fetchBookAgain();
    //     }, [title]);
    // }
    // else {
    //     setIsLoading(false);
    // }
    return (
        <div style={{ color: "white" }}>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className="main-div">
                    <div className="book-container">
                        <div className="cover">
                            <img src={book.cover || "/src/defaultCover.jpg"} alt="" />
                        </div>
                        <BookInfo book={book} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default BookDetails
