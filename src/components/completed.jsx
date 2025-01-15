import React, { useState, useEffect } from 'react'
import { getCompleted } from './functions'
import GroupOfBooks from './groupOfBooks'

const Completed = ({ setCurrBook }) => {
    const [books, setBooks] = useState([])

    // Load books from localStorage on component mount
    useEffect(() => {
        const completed = getCompleted()
        if (completed === null)
        {
            setBooks([]);
        }
        else
        {
            setBooks(completed)
        } 
    }, [])

    return (
        <div className='main-container'>
            {books.length ? (
                <GroupOfBooks
                    category="Completed :)"
                    books={books}
                    setCurrBook={setCurrBook}
                />
            ) : (
                <p>No books in the Completed yet!</p>
            )}
        </div>
    )
}

export default Completed