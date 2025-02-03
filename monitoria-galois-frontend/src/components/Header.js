import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
    background-color: #76042F;
    color: white;
    padding: 1rem;
    text-align: center;
`;

const Header = () => {
    return (
        <HeaderContainer>
            <h1>Monitoria Galois</h1>
        </HeaderContainer>
    );
};

export default Header;