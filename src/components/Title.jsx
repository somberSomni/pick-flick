import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TitleContainer = styled.h3`
    border: 2px solid black;
    border-radius: 25px;
    max-width: 300px;
    padding: 5px 10px;
`;

export default function Title({children, icon}) {
    return (
        <TitleContainer>
            {icon ? 
                <FontAwesomeIcon 
                    style={{ marginRight: 5 }}
                    icon={['fal', icon]} /> : null }
            {children}
        </TitleContainer>
    )
}