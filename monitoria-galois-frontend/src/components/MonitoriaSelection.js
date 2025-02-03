import React from 'react';
import styled from 'styled-components';

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
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    width: 100%;

    &:hover {
        background-color: #45a049;
    }
`;

const MonitoriaSelection = () => {
    const monitorias = ['Matemática', 'Física', 'História', 'Geografia', 'Química', 'Biologia'];

    return (
        <SelectionContainer>
            <h2>Selecione a Monitoria:</h2>
            <List>
                {monitorias.map((monitoria, index) => (
                    <ListItem key={index}>
                        <MonitoriaButton onClick={() => alert(`Você selecionou ${monitoria}`)}>
                            {monitoria}
                        </MonitoriaButton>
                    </ListItem>
                ))}
            </List>
        </SelectionContainer>
    );
};

export default MonitoriaSelection;