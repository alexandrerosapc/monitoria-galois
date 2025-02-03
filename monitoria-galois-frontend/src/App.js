import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import MatriculaForm from './components/MatriculaForm';
import MonitoriaSelection from './components/MonitoriaSelection';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<MatriculaForm />} />
                <Route path="/selecionar-monitoria" element={<MonitoriaSelection />} />
            </Routes>
        </Router>
    );
}

export default App;