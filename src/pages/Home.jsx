import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { images } from '../config/moviedb.json';
import  { MOVIEDB_KEY } from '../env.json';
//components
import Movies from '../components/Movies.jsx';
import Feature from '../components/Feature.jsx';
import MovieSection from '../components/MovieSection.jsx';
import Title from '../components/Title.jsx';

export default function Home({windowWidth, mobile}) {
    const [recentMovies, setRecentMovies] = useState([]);
    const [latestMovie, setLatestMovie] = useState({});
    const [nowMovies, setNowMovies] = useState([]);
    useEffect(() => {
        console.log(MOVIEDB_KEY);
        ///movie/upcoming
        axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${MOVIEDB_KEY}`)
        .then(res => {
            const { data, status } = res;
            if(status === 200) {
                const { results } = data;
                setLatestMovie(results[0]);
                setNowMovies(results.slice(1));
                return axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${MOVIEDB_KEY}`)
            }
        })
        .then(res => {
            const { data, status } = res;
            if(status === 200) {
                const { results } = data;
                console.log(data);
                setRecentMovies(results);
            }
        })
    }, [])
    return (
        <div style={{ paddingTop: 50 }}>
            <Feature 
                mobile={mobile}
                windowWidth={windowWidth}
                size={mobile ? images.poster_sizes[4] : images.poster_sizes[3]}
                {...latestMovie}/>
            <Title icon='popcorn'>Upcoming Movies</Title>
            <MovieSection>
                <Movies 
                    movies={recentMovies} 
                    windowWidth={windowWidth} 
                    size={images.poster_sizes[0]} />
            </MovieSection>
        </div>
    )
}