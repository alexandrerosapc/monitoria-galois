import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import MatriculaForm from './components/MatriculaForm';
import MonitoriaSelection from './components/MonitoriaSelection';

// Componente wrapper para a rota do MatriculaForm
const MatriculaFormWrapper = () => {
    const location = useLocation();
    // Pega a monitoria do state da navegação, ou define como null se não existir
    const selectedMonitoria = location.state?.selectedMonitoria || null;

    // Renderiza o MatriculaForm passando a prop
    return <MatriculaForm selectedMonitoria={selectedMonitoria} />;
};

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/matricula" element={<MatriculaFormWrapper />} />
                <Route path="/" element={<MonitoriaSelection />} />
            </Routes>
        </Router>
    );
}

export default App;