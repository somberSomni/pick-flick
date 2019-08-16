import React, { useEffect, useState } from 'react';
import axios from 'axios';

import  { MOVIEDB_KEY } from '../env.json';
//components
import Movies from '../components/Movies.jsx';



export default function Home({windowWidth, mobile}) {
    const [recentMovies, setRecentMovies] = useState([]);
    useEffect(() => {
        console.log(MOVIEDB_KEY);
        ///movie/upcoming
        axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${MOVIEDB_KEY}`)
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
        <div>
            <Movies movies={recentMovies} windowWidth={windowWidth} />
        </div>
    )
}