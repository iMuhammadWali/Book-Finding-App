import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '/src/App.css'
import GroupOfBooks from "./groupOfBooks";

export default function DefaultBooks({ setCurrBook }) {
  const [books, setBooks] = useState([]);
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log("Scrolled");
  }, [pathname]);

  //I have to shuffle this object on every load (I have decided that i wont be doing it anymore)
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

  useEffect(() => {
    fetchAllBooks();
  }, []);

  // Group books by category
  const groupedBooks = Object.keys(queries).reduce((acc, category) => {
    acc[category] = books.filter(book => book.category === queries[category]);
    return acc;
  }, {});

  return (
    <div className='main-container'>
      <span className="h1">Explore Different Genres</span>
      {Object.keys(groupedBooks).map(category => (
        <GroupOfBooks
          key={category}
          category={category}
          books={groupedBooks[category]}
          setCurrBook={setCurrBook} // Ensure this prop is passed
        />
      ))}
    </div>
  );
}