import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import NoteState from './context/notes/NoteState';

const App = () => {
  return (
    <NoteState>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
     </NoteState>
  );
}

export default App;
