import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Practicas from './components/Practices';
import Onu from './components/Onu';
import Stats from './components/Stats';
import News from './components/News';

function App() {
  return (
    <Router basename="/nature">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buenas-practicas" element={<Practicas />} />
          <Route path="/onu" element={<Onu />} />
          <Route path="/estadisticas" element={<Stats />} />
          <Route path="/clima" element={<News />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
