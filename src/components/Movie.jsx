import React from 'react';
import styled from 'styled-components';
import Rating from './Rating.jsx';
import { images } from '../config/moviedb.json';
import { Link } from 'react-router-dom';

const MovieContainer = styled.div`
    margin: 5px 0px 0px 5px;
    position: relative;
    cursor: pointer;
    &:hover {
        box-shadow: 1px 1px 2px 2px rgba(0,0,0,0.2);
    }
`;

const InfoContainer = styled.div`
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: ${props => props.size}px;
    position: absolute;
    background: #222;
    color: white;
    z-index: 1;
    opacity: 0;
    width: 100%;
    height: 100%;
    transition: opacity 1s;
    &:hover {
        opacity: 0.8;
    }
`;

export default function Movie({ id, title, poster_path, vote_average }) {
    console.log(poster_path);
    const size = images.poster_sizes[0];
    return (
        <MovieContainer>
            <Link to={`/movie/${id}`}>
                <img src={`https://image.tmdb.org/t/p/${size}/${poster_path}`} />
                <InfoContainer size={size}>
                    <h5 style={{ marginBottom: -10 }}>{title}</h5>
                    <Rating rating={vote_average} />
                </InfoContainer>
            </Link>
        </MovieContainer>
    )
}