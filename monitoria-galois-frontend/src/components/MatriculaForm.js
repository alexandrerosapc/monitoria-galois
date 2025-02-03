import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const MatriculaForm = () => {
    const [matricula, setMatricula] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const { data } = await axios.post('http://localhost:5000/validar-matricula', { matricula });
          // Se chegou aqui, significa que a matrícula foi encontrada
          navigate('/selecionar-monitoria');
        } catch (error) {
          if (error.response && error.response.status === 404) {
            // Se o status for 404, significa que a matrícula não foi encontrada
            alert("Matrícula não encontrada!");
          } else {
            console.error("Erro ao conectar com a API:", error);
            alert("Erro ao processar matrícula. Tente novamente mais tarde.");
          }
        }
      };
      
      

    return (
        <FormContainer onSubmit={handleSubmit}>
            <label>
                Insira sua matrícula:
                <Input
                    type="text"
                    value={matricula}
                    onChange={(e) => setMatricula(e.target.value)}
                    required
                />
            </label>
            <Button type="submit">Continuar</Button>
        </FormContainer>
    );
};

const FormContainer = styled.form`
    margin: 2rem auto;
    width: 300px;
`;

const Input = styled.input`
    margin: 0.5rem 0;
    padding: 0.5rem;
    width: 100%;
`;

const Button = styled.button`
    background-color: #76042F;
    color: white;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    width: 100%;

    &:hover {
        background-color: #45a049;
    }
`;

export default MatriculaForm;
