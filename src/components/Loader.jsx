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
            <h2 style={{ fontFamily: 'Graduate' }}>Finding the movie</h2>
            <FontAwesomeIcon 
                size='4x'
                icon={['fal', 'popcorn']} />
            <h4>Please be patient</h4>
            <CircularProgress />
        </LoaderContainer>
    )
}