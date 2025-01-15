import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '/src/App.css'
import GroupOfBooks from "./groupOfBooks";
import NUCES_Books from '../../data/nucesBooks';

const API_Key = import.meta.env.VITE_API_KEY;

export default function DefaultBooks({ setCurrBook }) {
  const [books, setBooks] = useState([]);
  const { pathname } = useLocation();
  const [groupedBooks, setGroupedBooks] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log("Scrolled");
  }, [pathname]);

  //I have to shuffle this object on every load (I have decided that i wont be doing it anymore).
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
  };

  useEffect(() => {
    const localBooks = JSON.parse(localStorage.getItem('defaultBooks'));
    
    if (!localBooks || localBooks.length <= 0)
      fetchAllBooks();
    else {
      setBooks(localBooks);
    }
  }, []);

  useEffect(() => {
    if (books.length > 0 && !localStorage.getItem('defaultBooks')) {
      localStorage.setItem('defaultBooks', JSON.stringify(books));
    }
  }, [books]);

  useEffect(() => {
    const grouped = Object.keys(queries).reduce((acc, category) => {
      acc[category] = books.filter(book => book.category === queries[category]);
      return acc;
    }, {});
    setGroupedBooks(grouped);
  }, [books])

  return (
    <div className='main-container'>

      {/* Display the Nuces Books first */}
      <GroupOfBooks
          key="Nuces"
          category={"FAST-NUCES Books"}
          books={NUCES_Books}
          setCurrBook={setCurrBook}
        />
      <span className="h1">Explore Different Genres</span>
      {Object.keys(groupedBooks).map(category => (
        <GroupOfBooks
          key={category}
          category={category}
          books={groupedBooks[category]}
          setCurrBook={setCurrBook}
        />
      ))}
    </div>
  );
}