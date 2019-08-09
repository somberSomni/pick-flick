import React from 'react';
import styled from 'styled-components';
import Rating from './Rating.jsx';

const MovieContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: no-wrap;
`;

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100px;
    padding: 5px;
`;

export default function Movie({title, poster_path, vote_average}) {
    console.log(poster_path);
    return (
        <MovieContainer>
            <img width={100} src={`https://image.tmdb.org/t/p/w200/${poster_path}`} />
            <InfoContainer>
                <h4>{title}</h4>
                <Rating rating={vote_average} />
            </InfoContainer>
        </MovieContainer>
    )
}