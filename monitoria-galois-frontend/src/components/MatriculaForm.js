import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';


const MatriculaForm = ({ selectedMonitoria }) => {
    const [matricula, setMatricula] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

      const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMsg('');

        if (!selectedMonitoria) {
            setErrorMsg("Erro: Monitoria não selecionada.");
            setIsLoading(false);
            return;
        }

        try {
          const validationResponse = await axios.post(process.env.REACT_APP_BASE_URL + '/validar-matricula', { matricula });
          const studentData = validationResponse.data;

          const registrationData = {
              matricula: matricula,
              studentId: studentData.id,
              studentName: studentData.nome_aluno,
              studentGrade: studentData.serie_aluno,
              studentClass: studentData.turma_aluno,
              monitoria: selectedMonitoria,
              registrationTime: new Date().toISOString()
          };

          await axios.post(process.env.REACT_APP_BASE_URL + '/register-monitoria', registrationData);

          alert(`Monitoria de ${selectedMonitoria} registrada com sucesso para ${studentData.nome_aluno}!`);
          setMatricula('');
          navigate('/');

        } catch (error) {
          if (error.response && error.response.status === 404) {
            setErrorMsg("Matrícula não encontrada!");
          } else if (error.response) {
            setErrorMsg(`Erro: ${error.response.data.message || 'Não foi possível completar a operação.'}`);
            console.error("Erro na API:", error.response);
          } else {
            setErrorMsg("Erro ao conectar com o servidor. Tente novamente.");
            console.error("Erro ao conectar com a API:", error);
          }
        } finally {
          setIsLoading(false);
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
                    disabled={isLoading}
                />
            </label>
            {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
            <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Processando...' : 'Confirmar Presença'}
            </Button>
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
        background-color:rgba(94, 3, 37, 0.9);
    }
`;

const ErrorMessage = styled.p`
    color: red;
    font-size: 0.9em;
    margin-top: 0.5rem;
    text-align: center;
`;

export default MatriculaForm;
