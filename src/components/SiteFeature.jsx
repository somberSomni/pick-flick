import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const FeatureContainer = styled.div`
    max-width: 250px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border: 3px solid white;
    border-radius: 5px;
    margin: 10px;
    color: white;
`;

const Details = styled.p`
    padding: 0px 25px;
`;

export default function SiteFeature({children, icon, label}) {
    return (
        <FeatureContainer>
            <h3 style={{ fontFamily: 'Graduate' }}>{label}</h3>
            <FontAwesomeIcon 
                size='6x'
                icon={['fal', icon]} />
            <Details>{children}</Details>
        </FeatureContainer>
    )
}