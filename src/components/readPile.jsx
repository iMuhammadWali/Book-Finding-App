import React, { useState, useEffect } from 'react'
import { getReadPile } from './functions'
import GroupOfBooks from './groupOfBooks'

const ReadPile = ({ setCurrBook }) => {
    const [books, setBooks] = useState([])

    // Load books from localStorage on component mount
    useEffect(() => {
        const readPile = getReadPile()
        setBooks(readPile)
    }, [])

    const removeBook = (book) => {
        deleteFromReadPile(book)
        setBooks(prevBooks => prevBooks.filter(b => b.ID !== book.ID))
    }

    return (
        <div className='main-container'>
            {books.length ? (
                <GroupOfBooks
                    category="Read Pile"
                    books={books}
                    setCurrBook={setCurrBook}
                    removeBook={removeBook}
                />
            ) : (
                <p>No books in the read pile yet!</p>
            )}
        </div>
    )
}

export default ReadPile