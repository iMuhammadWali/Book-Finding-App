import React, { useState } from 'react'
import DefaultBooks from './components/defaultBooks'
import SearchedBooks from './components/searchedBooks'
import BookDetails from './components/bookDetails'
import SlidingBar from './components/slidingBar'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import '/src/App.css'
import Header from './components/header'
import ReadPile from './components/readPile'
import Completed from './components/completed'

function App() {
  const [currBook, setCurrBook] = useState({});
  // const readpile
  return (
    <div style={{height: "auto"}}>
      <BrowserRouter>
        <Header />
        <SlidingBar/>
        <Routes>
          {/* <Route path='/search' element={<Navigate to="/" />} /> */}
          <Route path='/' element={<DefaultBooks setCurrBook={setCurrBook} />} />
          <Route path='/search' element={<DefaultBooks setCurrBook={setCurrBook} />} />
          <Route path='/search/:query' element={<SearchedBooks setCurrBook={setCurrBook} />} />
          <Route path='/details/:query' element={<BookDetails book={currBook}/>} />
          <Route path='/readPile' element={<ReadPile/>} />
          <Route path='/completed' element={<Completed/>} />

        </Routes>
      </BrowserRouter>
    </div >
  )
}
export default App