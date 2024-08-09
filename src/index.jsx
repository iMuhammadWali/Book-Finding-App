import React, { useState } from 'react'
import DefaultBooks from './components/defaultBooks'
import SearchedBooks from './components/searchedBooks'
import BookDetails from './components/bookDetails'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import '/src/App.css'
import Header from './components/header'

function App() {
  const [currBook, setCurrBook] = useState({});
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<DefaultBooks setCurrBook={setCurrBook} />} />
          <Route path='/search/:query' element={<SearchedBooks setCurrBook={setCurrBook} />} />
          <Route path='/details/:title' element={<BookDetails book={currBook}/>} />
        </Routes>
      </BrowserRouter>
    </div >
  )
}
export default App