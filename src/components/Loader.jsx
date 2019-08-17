import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const LoaderContainer = styled.div`
    max-width: 300px;
`;

export default function Loader() {
    return (
        <LoaderContainer>
            <h1 style={{ fontFamily: 'Graduate' }}>Finding the movie</h1>
            <FontAwesomeIcon 
                size='4x'
                icon={['fal', 'popcorn']} />
            <h3>Please be patient</h3>
            <CircularProgress />
        </LoaderContainer>
    )
}