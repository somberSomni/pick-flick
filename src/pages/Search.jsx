import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  { MOVIEDB_KEY } from '../env.json';
import styled from 'styled-components';
import MovieLarge from '../components/MovieLarge.jsx';

const SearchContainer = styled.div`
    padding-top: 50px;
`;

const Icon = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: no-wrap;
    justify-content: center;
    align-items: center;
`;

const Pagination = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: no-wrap;
    justify-content: space-between;
    align-items: center;
    width: 100vw;
    height: auto;
`;

const Message = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 300px;
    width: 50vw;
`;

const MovieContainer = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: flex-start;
    width: 100vw;
`;


export default function Search({location, setSearching, searching}) {
    const [ pageNum, setPageNum ] = useState(1);
    const [ totalPages, setTotalPages ] = useState(1);
    const [ movies, setMovies ] = useState([]);
    useEffect(() => { 
        if(searching) {
            setSearching(false)
            if(pageNum <= totalPages) {
                axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${MOVIEDB_KEY}&query=${location.state.query}&page=${pageNum}`)
                .then(res => {
                    const { data, status } = res;
                    if(status === 200) {
                        const { results, total_pages } = data;
                        console.log(results);
                        setTotalPages(total_pages);
                        setMovies(results);
                    }
                })
            }
        }
    }, [searching])
    return (
        <SearchContainer>
            <Pagination>
                <Icon>
                    <FontAwesomeIcon 
                        style={{ margin: 5 }}
                        size='2x'
                        icon={['fal', 'arrow-circle-left']} />
                    <p>Previous</p>
                </Icon>
                <Icon>
                    <p>Next</p>
                    <FontAwesomeIcon 
                        style={{ margin: 5 }}
                        size='2x'
                        icon={['fal', 'arrow-circle-right']} />
                </Icon>
            </Pagination>
            <MovieContainer>
                { movies.length > 0 ?
                    movies.map(movie => <MovieLarge key={movie.id} {...movie} /> ) :
                    (<Message>
                        <h1>No results</h1>
                        <h3>Search for a movie using the search bar above</h3>
                    </Message>)}
            </MovieContainer>
        </SearchContainer>
    )
}