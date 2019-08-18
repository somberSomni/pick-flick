import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { VisualRating } from '../components/Rating.jsx';
import { images } from '../config/moviedb.json';
import  { MOVIEDB_KEY } from '../env.json';
import Chip from '@material-ui/core/Chip';
import Cast from '../components/Cast.jsx';
import Movies from '../components/Movies.jsx';
import Title from '../components/Title.jsx';
import Loader from '../components/Loader.jsx';
import MovieSection from '../components/MovieSection.jsx';

const MovieHeader = styled.header`
    display: flex;
    flex-direction: row;
    background: url(${props => props.url});
    background-size: cover;
    background-position-x: center;
    background-position-y: ${props => props.pos < 300 ? props.pos / -10 : 0}px;
    transition: background-position-y 0.5s;
    width: 100vw;
    height: 250px;
`;

const TitleSection = styled.section`
    display: flex;
    flex-direction: ${props => props.mobile ? 'column' : 'row' };
    align-items: flex-start;
    width: 100vw;
    border-bottom: ${props => props.mobile ? 'none' : '2px solid #CCC'};
    height: auto;
`;

const TitleInfo = styled.div`
    display: flex;
    flex-direction: ${props => props.mobile ? 'row' : 'column'};
    justify-content: ${props => props.mobile ? 'space-between' : 'center'};
    align-items: center;
    min-width: ${props => props.mobile ? '100vw' : '200px'};
    margin-bottom: -10px;
    border-bottom: ${props => props.mobile ?  '2px solid #CCC' : 'none'};
    background: #DDD;
    height: ${props => props.mobile ?  'auto' : '100%'};
    border-radius: 0px 0px 10px 0px;
`;

const Tagline = styled.h6`
    margin-top: -10px;
    padding: 0px 25px;
`;

const InfoSection = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-cotent: center;
    width: 100%;
    margin-top: 25px;
`;

const Overview = styled.div`
    text-align: justify;
    padding: 25px;
    margin-bottom: -20px;
    &:first-letter {
        font-size: 2em;
    }
`;

const Genres = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 10px;
`;

const Container = styled.div`
    padding-top: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: ${props => props.load ? 'center' : 'flex-start'};
    height: ${props => props.load ? '100vh' : 'auto'};
`;

export default function MoviePage({match, mobile, windowWidth, scrollPos}) {
    const [movie, setMovie] = useState({});
    const [cast, setCast] = useState([]);
    const [crew, setCrew] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [similar, setSimilar] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        window.scrollTo(0,0);
        axios.get(`https://api.themoviedb.org/3/movie/${match.params.id}?api_key=${MOVIEDB_KEY}`)
        .then(res => {
            const { data, status } = res;
            if(status === 200) {
                setMovie(data);
                return axios.get(`https://api.themoviedb.org/3/movie/${match.params.id}/credits?api_key=${MOVIEDB_KEY}`)
            }
        })
        .then(res => {
            const { data, status } = res;
            if(status === 200) {
                const { cast, crew } = data;
                console.log(cast, crew);
                setCrew(crew);
                setCast(cast);
                return axios.get(`https://api.themoviedb.org/3/movie/${match.params.id}/recommendations?api_key=${MOVIEDB_KEY}`)
            }
        })
        .then(res => {
            const { data, status } = res;
            if(status === 200) {
                const { results } = data;
                setRecommendations(results);
                return axios.get(`https://api.themoviedb.org/3/movie/${match.params.id}/similar?api_key=${MOVIEDB_KEY}`)
            }
        })
        .then(res => {
            const { data, status } = res;
            if(status === 200) {
                const { results } = data;
                setSimilar(results);
            }
        })
        .finally(() => {
            setLoading(false);
        })
        .catch(err => {
            console.log(err.message);
        })
    }, [match.params.id])
    const { backdrop_path, genres, title, vote_average, tagline, overview, release_date} = movie;
    const date = release_date ? new Date(release_date) : null;
    return (
        <Container load={loading}>
            {loading ? <Loader /> : 
            (<React.Fragment>
                {Object.keys(movie).length > 0 ? 
                (<React.Fragment>
                    {backdrop_path ? 
                    <MovieHeader 
                        pos={scrollPos}
                        url={`https://image.tmdb.org/t/p/${images.backdrop_sizes[2]}/${backdrop_path}`}>
                    </MovieHeader> : null}
                    <TitleSection mobile={mobile}>
                        <TitleInfo mobile={mobile}>
                            <div>
                                <h1 style={{ padding: 20 }}>{title}</h1>
                                <Tagline>{tagline}</Tagline>
                            </div>
                            {vote_average === 0 ? 'N/A' : <VisualRating rating={vote_average} />}
                        </TitleInfo>
                        <InfoSection>
                            <div>
                                <h3 style={{ marginBottom: -20 }}>overview</h3>
                                <Overview>{overview}</Overview>
                            </div>
                            <h5>Release date: {date ? date.toLocaleDateString('en-US') : ''} </h5>
                            <Genres>
                                {genres.map(genre => 
                                    <Chip 
                                        key={genre.id} 
                                        size="small" 
                                        style={{ width: 100, margin: 5}}
                                        label={genre.name}/>)}
                            </Genres>
                        </InfoSection>
                    </TitleSection>
                </React.Fragment>) : null }
                {similar.length > 0  ? 
                (<React.Fragment>
                <Title icon='popcorn'>Similar Movies</Title>
                <MovieSection>
                    <Movies 
                        movies={similar} 
                        windowWidth={windowWidth} 
                        size={images.poster_sizes[0]} />
                </MovieSection>
                </React.Fragment>) : null }
                {recommendations.length > 0  ? 
                (<React.Fragment>
                    <Title icon='thumbs-up'>Recommended Movies</Title>
                    <MovieSection>
                        <Movies 
                            movies={recommendations} 
                            windowWidth={windowWidth} 
                            size={images.poster_sizes[0]} />
                    </MovieSection>
                </React.Fragment>) : null }
                <Title>Cast <span style={{ fontStyle: 'italic', fontSize: '0.8em' }}>in order of appearance</span></Title>
                <MovieSection>
                {cast.length > 0 ? 
                   <Cast 
                        isCast={true}
                        size={images.profile_sizes[0]}
                        mobile={mobile}
                        cast={cast} /> : 
                    <h1>Currently No Cast Info</h1>}
               </MovieSection>
                <Title>Crew </Title>
    
                    {crew.length > 0 ? 
                    <Cast 
                        isCast={false}
                        size={images.profile_sizes[0]}
                        mobile={mobile}
                        cast={crew} /> : 
                    <h1>Currently No Crew Info</h1>}
            </React.Fragment>)  }
        </Container>
    )
}