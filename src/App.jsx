import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';  // Tu navbar
import Home from './components/Home';  // Componente Home
import Practicas from './components/Practices';  // Componente Buenas Practicas
import Onu from './components/Onu';  // Componente Onu
import Stats from './components/Stats';  // Componente Estadisticas
import News from './components/News';  // Componente Clima

function App() {
  return (
    <Router>
      {/* Coloca el Navbar dentro de Router */}
      <Navbar />
      <div className="content">
        {/* Definir las rutas */}
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
