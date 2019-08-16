import React, { useEffect, useState } from 'react';
import Movie from './Movie.jsx';
import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MoviesContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: no-wrap;
    transform: translateX(${props => props.translation}px);
    transition: transform 1.5s;
`;

const FabContainer = styled.div`
    position: absolute;
    z-index: 99;
    top: 50%;
    ${props => props.left ? 'left: 0' : 'right: 0'};
    transform: translateY(-50%);
`;

const Container = styled.div`
    display: block;
    width: 100vw;
    overflow: hidden;
    position: relative;
`;

export default function Movies({movies, windowWidth, size}) {
    const [numOfMovies, setNumOfMovies] = useState(0);
    const [index, setIndex] = useState(0);
    const [translation, setTranslation] = useState(0);
    const newSize = parseInt(size.slice(1)) + 5; // added padding
    useEffect(() => {
        setNumOfMovies(Math.floor(windowWidth / newSize));
    }, [windowWidth]);
    function handleClick(right) {
        if(right) {
            if(index + numOfMovies < movies.length) {
                const diff = movies.length - (index + numOfMovies);
                if(diff < numOfMovies) {
                    const newTranslate = -1 * diff * newSize;
                    setTranslation(translation + newTranslate)
                    setIndex(index + diff);
                } else {
                    const newTranslate = -1 * numOfMovies * newSize;
                    setTranslation(translation + newTranslate)
                    setIndex(index + numOfMovies);
                }
            }
        } else {
            if(index > 0) {
                if(index < numOfMovies) {
                    setTranslation(0)
                    setIndex(0);
                } else {
                    const newTranslate = 1 * Math.floor(windowWidth / newSize) * newSize;
                    setTranslation(translation + newTranslate)
                    setIndex(index - numOfMovies);
                }
            }
        }
    }
    return (
        <Container>
            <FabContainer left={true}>
                <Fab 
                    onClick={() => {handleClick(false)}}
                    size='small'
                    aria-label="left">
                    <FontAwesomeIcon 
                        icon={['far', 'chevron-left']} />
                </Fab>
            </FabContainer>
            <FabContainer left={false}>
                <Fab 
                    onClick={() => {handleClick(true)}}
                    size='small'
                    aria-label="right">
                    <FontAwesomeIcon 
                        icon={['far', 'chevron-right']} />
                </Fab>
            </FabContainer>
            <MoviesContainer 
                translation={translation}>
                { movies.map(movie => 
                <Movie 
                    key={movie.id} 
                    size={size}
                    {...movie} /> )}
            </MoviesContainer>
        </Container>
    );
}