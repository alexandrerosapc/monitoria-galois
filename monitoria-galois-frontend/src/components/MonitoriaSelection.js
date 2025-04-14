import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const SelectionContainer = styled.div`
    text-align: center;
`;

const List = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const ListItem = styled.li`
    margin: 0.5rem 0;
`;

const MonitoriaButton = styled.button`
    background-color: #76042F;
    color: white;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    width: 100%;

    &:hover {
        background-color:rgb(0, 0, 0);
    }
`;

const MonitoriaSelection = () => {
    const navigate = useNavigate();
    const monitorias = ['Matemática', 'Física', 'História', 'Geografia', 'Química', 'Biologia'];

    const handleSelectAndNavigate = (monitoria) => {
        navigate('/matricula', { state: { selectedMonitoria: monitoria } });
    };

    return (
        <SelectionContainer>
            <h2>Selecione a Monitoria:</h2>
            <List>
                {monitorias.map((monitoria, index) => (
                    <ListItem key={index}>
                        <MonitoriaButton onClick={() => handleSelectAndNavigate(monitoria)}>
                            {monitoria}
                        </MonitoriaButton>
                    </ListItem>
                ))}
            </List>
        </SelectionContainer>
    );
};

export default MonitoriaSelection;