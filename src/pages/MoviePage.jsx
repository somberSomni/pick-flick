import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { VisualRating } from '../components/Rating.jsx';
import { images } from '../config/moviedb.json';
import  { MOVIEDB_KEY } from '../env.json';

const MovieHeader = styled.header`
    display: flex;
    flex-direction: row;
    background: url(${props => props.url});
    background-size: cover;
    background-position-x: center;
    background-position-y: top 50px;
    width: 100vw;
    height: 300px;
`;
export default function MoviePage({match}) {
    const [movie, setMovie] = useState({});
    useEffect(() => {
        console.log(match.params.id);
        axios.get(`https://api.themoviedb.org/3/movie/${match.params.id}?api_key=${MOVIEDB_KEY}`)
        .then(res => {
            const { data, status } = res;
            if(status === 200) {
                console.log(data);
                setMovie(data);
            }
        })
    }, [])
    const { backdrop_path, title, vote_average } = movie;
    console.log(backdrop_path)
    return (
        <div>
            <MovieHeader url={`https://image.tmdb.org/t/p/${images.backdrop_sizes[2]}/${backdrop_path}`}>
                <h1>{title}</h1>
                <VisualRating rating={vote_average} />
            </MovieHeader>
        </div>
    )
}