import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CompilerPage from './pages/CompilerPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/compiler/:language" element={<CompilerPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;