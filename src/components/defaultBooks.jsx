import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '/src/App.css'
import GroupOfBooks from "./groupOfBooks";

const API_Key = import.meta.env.VITE_API_KEY;

export default function DefaultBooks({ setCurrBook }) {
  const [books, setBooks] = useState([]);
  const { pathname } = useLocation();
  const [groupedBooks, setGroupedBooks] = useState([]);
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
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_Key}&maxResults=7`);
      const data = await response.json();
      const books = data.items || [];
      console.log("books fetched");
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
    // Directly store the books in local storage
    // localStorage.setItem('defaultBooks', JSON.stringify(books));

    // Logs for verification
    // console.log(JSON.parse(localStorage.getItem('defaultBooks')), 'books are set in the local storage')
    // console.log(books, 'books are stored in the local storage');
  };

  useEffect(() => {
    const localBooks = JSON.parse(localStorage.getItem('defaultBooks'));
    
    if (!localBooks || localBooks.length <= 0)
      fetchAllBooks();
    else {
      setBooks(localBooks);
      console.log("Books are fetched locally noi")
    }
  }, []);

  useEffect(() => {
    if (books.length > 0 && !localStorage.getItem('defaultBooks')) {
      localStorage.setItem('defaultBooks', JSON.stringify(books));
      console.log(books, 'books are set in the local storage');
    }
  }, [books]);

  useEffect(() => {
    const grouped = Object.keys(queries).reduce((acc, category) => {
      acc[category] = books.filter(book => book.category === queries[category]);
      return acc;
    }, {});
    setGroupedBooks(grouped);
  }, [books])

  // localStorage.setItem('defaultBooksTime', Date.now());
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