import React, { useEffect } from 'react';
import Movie from './Movie.jsx';
import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MoviesContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: no-wrap;
    transform: translateX(-${97 * 10}px);
`;

const Container = styled.div`
    display: block;
    width: 100vw;
    overflow: hidden;
`;

export default function Movies({movies, windowWidth}) {

    return (
        <Container>
            <Fab 
                size='small'
                aria-label="left">
                <FontAwesomeIcon 
                    icon={['far', 'chevron-left']} />
            </Fab>
            <Fab 
                size='small'
                aria-label="right">
                <FontAwesomeIcon 
                    icon={['far', 'chevron-right']} />
            </Fab>
            <MoviesContainer>
                { movies.map(movie => <Movie key={movie.id} {...movie} /> )}
            </MoviesContainer>
        </Container>
    );
}