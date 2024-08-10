import { useState, useEffect } from 'react';
import { fetchBookCover } from '../../JavaScript/fetchBookCover';
import { MoonLoader } from 'react-spinners';
import '/src/App.css'
import GroupOfBooks from "./groupOfBooks";
import { ScrollRestoration } from 'react-router-dom';


export default function DefaultBooks({ setCurrBook }) {
  const [books, setBooks] = useState([]);
  const [bookCovers, setBookCovers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  //I have to shuffle this object on every load
  const queries = {
    'Fantasy': 'subject:fantasy',
    'Mystery': 'subject:mystery',
    'History': 'subject:history',
    'Thriller': 'subject:thriller',
  };

  const fetchBooks = async (query) => {
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=7`);
      const data = await response.json();
      const books = data.items || [];
      books.forEach(book => {
        book.category = query;
      });
      return books;
    } catch (e) {
      console.log(e);
      return [];
    }
  };

  const fetchAllBooks = async () => {
    const promises = Object.values(queries).map(query => fetchBooks(query));
    const responses = await Promise.all(promises);
    setBooks(responses.flat());
  };

  const fetchCovers = async () => {
    const covers = {};
    const coverPromises = books.map(async (book) => {
      const coverUrl = await fetchBookCover(book);
      covers[book.id] = coverUrl;
    });
    await Promise.all(coverPromises);
    setBookCovers(covers);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAllBooks();
    setIsLoading(true);
  }, []);

  useEffect(() => {
    fetchCovers();
  }, [books]);

  // Group books by category
  const groupedBooks = Object.keys(queries).reduce((acc, category) => {
    acc[category] = books.filter(book => book.category === queries[category]);
    return acc;
  }, {});

  return (
    <div className='main-container'>
      <span className="h1">Explore Different Genres</span>
      {Object.keys(groupedBooks).map(category =>
        <GroupOfBooks
          key={category}
          category={category}
          books={groupedBooks[category]}
          bookCovers={bookCovers}
          setCurrBook={setCurrBook} // Ensure this prop is passed
          // currBook={currBook}
        />
      )}
      {/* <ScrollRestoration/> */}
    </div>
  );
}