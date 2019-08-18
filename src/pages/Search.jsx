import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MOVIEDB_KEY } from '../env.json';
import styled from 'styled-components';
import MovieLarge from '../components/MovieLarge.jsx';
import Loader from '../components/Loader.jsx';

const SearchContainer = styled.div`
    padding-top: 50px;
    min-height: 5;
`;

const Icon = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: no-wrap;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    opacity: 1;
    transition: opacity 0.5s;
    &:hover {
        opacity: 0.6;
    }
`;

const Pagination = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: no-wrap;
    justify-content: center;
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
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    align-items: flex-start;
    width: 100vw;
`;

const NumbersSpan = styled.span`
    margin: 2px;
    color: ${props => props.active ? props.color : '#333'};
    opacity: 1;
    transition: opacity 0.5s;
    cursor: pointer;
    &:hover {
        opacity: 0.6;
    }
`;

export default function Search({ location, mobile, colors }) {
    const [pageNum, setPageNum] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [movies, setMovies] = useState([]);
    const [firstRun, setFirstRun] = useState(true);
    const [query, setQuery ] = useState(location.search && location.search.length > 0 ? location.search.slice(3) : '');
    const [loading, setLoading ] = useState(true);
    function getPopular() {
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${MOVIEDB_KEY}&page=${pageNum}`)
            .then(res => {
                const { data, status } = res;
                if (status === 200) {
                    const { results, total_pages } = data;
                    setTotalPages(total_pages <= 500 ? total_pages : 500);
                    setMovies(results);
                }
            })
            .finally(() => { setLoading(false) })
            .catch(err => {
                console.log(err.message);
                setMovies([]);
            })
    }
    useEffect(() => {
        //console.log('searching ', query)
        window.scrollTo(0,0);
        if (query.length > 0) {
            if (pageNum <= totalPages) {
                axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${MOVIEDB_KEY}&query=${query.length > 0 ? query : location.state.query.trim()}&page=${pageNum}`)
                    .then(res => {
                        const { data, status } = res;
                        if (status === 200) {
                            const { results, total_pages } = data;
                            setTotalPages(total_pages <= 500 ? total_pages : 500);
                            setMovies(results);
                            setFirstRun(false);
                        }
                    })
                    .finally(() => { setLoading(false) })
                    .catch(err => {
                        console.log(err.message);
                        setMovies([]);
                    })

            }
        } else {
            if (query.length === 0 || firstRun) {
                console.log('getting popular', query, firstRun)
                getPopular();
            }
        }
    }, [pageNum, firstRun]);

    function handlePage(prev) {
        if (prev) {
            if (pageNum >= 1) {
                setPageNum(pageNum - 1);
            }
        } else {
            if (pageNum < totalPages) {
                setPageNum(pageNum + 1);
            }
        }
    }

    function createPageNumbers() {
        let nums = [];
        for (let i = 1; i <= totalPages; i++) {
            if (totalPages > 1) {
                if (pageNum < 5) {
                    if (i <= 5 || i >= totalPages - 2) {
                        nums.push(<NumbersSpan
                            active={i === pageNum}
                            color={colors[3]}
                            onClick={() => { setPageNum(i) }}
                            key={i.toString()}>
                            {totalPages > 5 && totalPages - 2 === i ? '...' : ''}{i}
                        </NumbersSpan>);
                    }
                } else if (pageNum >= 5) {
                    if (i <= 2 || (i >= pageNum - 2 && i <= pageNum + 2) || i >= totalPages - 2) {
                        nums.push(<NumbersSpan
                            color={colors[3]}
                            active={i === pageNum}
                            onClick={() => { setPageNum(i) }}
                            key={i.toString()}>
                            {totalPages > 5 && (totalPages - 2 === i || i === pageNum - 2) ? '...' : ''}{i}
                        </NumbersSpan>);
                    }
                }
            }
        }
        return nums;
    }
    return (
        <SearchContainer>
            <MovieContainer>
                {loading ? <Loader />: 
                (movies.length > 0 ?
                    movies.map(movie =>
                        <MovieLarge
                            key={movie.id}
                            mobile={mobile}
                            {...movie} />) :
                            (<Message>
                        <h1>No results</h1>
                        <h3>Search for a movie using the search bar above</h3>
                     </Message>))}

            </MovieContainer>
            <Pagination>
                {pageNum > 1 ? <Icon onClick={() => { handlePage(true) }}>
                    <FontAwesomeIcon
                        style={{ margin: '5px 5px 5px 50px' }}
                        size='2x'
                        icon={['fal', 'arrow-circle-left']} />
                    <p style={{ marginRight: 10 }}>Previous</p>
                </Icon> : null}
                <h6>{createPageNumbers()}</h6>
                {pageNum < totalPages ? <Icon onClick={() => { handlePage(false) }}>
                    <p style={{ marginLeft: 10 }}>Next</p>
                    <FontAwesomeIcon
                        style={{ margin: '5px 50px 5px 5px' }}
                        size='2x'
                        icon={['fal', 'arrow-circle-right']} />
                </Icon> : null}
            </Pagination>
        </SearchContainer>
    )
}