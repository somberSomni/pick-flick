import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { VisualRating } from '../components/Rating.jsx';
import { images } from '../config/moviedb.json';
import  { MOVIEDB_KEY } from '../env.json';
import Chip from '@material-ui/core/Chip';
import People from '../components/People.jsx';
import Movies from '../components/Movies.jsx';

const MovieHeader = styled.header`
    display: flex;
    flex-direction: row;
    background: url(${props => props.url});
    background-size: cover;
    background-position-x: center;
    background-position-y: top;
    width: 100vw;
    height: 250px;
`;

const TitleSection = styled.section`
    display: flex;
    flex-direction: ${props => props.mobile ? 'column' : 'row' };
    align-items: flex-start;
    width: 100vw;
    border-bottom: ${props => props.mobile ? 'none' : '2px solid #CCC'};
`;

const TitleInfo = styled.div`
    display: flex;
    flex-direction: ${props => props.mobile ? 'row' : 'column'};
    justify-content: ${props => props.mobile ? 'space-between' : 'center'};
    align-items: center;
    min-width: ${props => props.mobile ? '100vw' : '200px'};
    margin-bottom: -10px;
    border-bottom: ${props => props.mobile ?  '2px solid #CCC' : 'none'};
`;

const Tagline = styled.h5`
    margin-top: -10px;
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
`;

const Container = styled.div`
    padding-top: 50px;
`;

const Cast = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;

`;

const LikeThis = styled.div`

`;

export default function MoviePage({match, mobile, windowWidth}) {
    const [movie, setMovie] = useState({});
    const [cast, setCast] = useState([]);
    const [crew, setCrew] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [similar, setSimilar] = useState([]);
    useEffect(() => {
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
        .catch(err => {
            console.log(err.message);
        })
    }, [])
    const { backdrop_path, genres, title, vote_average, tagline, overview, release_date} = movie;
    const date = release_date ? new Date(release_date) : null;
    return (
        <Container>
            {Object.keys(movie).length > 0 ? 
            (<React.Fragment>
                <MovieHeader url={`https://image.tmdb.org/t/p/${images.backdrop_sizes[2]}/${backdrop_path}`}>
                </MovieHeader>
                <TitleSection mobile={mobile}>
                    <TitleInfo mobile={mobile}>
                        <div>
                            <h1>{title}</h1>
                            <Tagline>{tagline}</Tagline>
                        </div>
                        {vote_average === 0 ? 'N/A' : <VisualRating rating={vote_average} />}
                    </TitleInfo>
                    <InfoSection>
                        <h5 style={{ marginBottom: -20 }}>overview</h5>
                        <Overview>{overview}</Overview>
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
            <h3>Cast <span style={{ fontStyle: 'italic', fontSize: '0.8em' }}>in order of appearance</span></h3>
            <Movies 
                movies={recommendations} 
                windowWidth={windowWidth} 
                size={images.poster_sizes[0]} />
            <Cast>
                { cast.slice(0,20).map((actor, i) => 
                    <People 
                        key={actor.credit_id} 
                        i={i}
                        mobile={mobile}
                        size={images.profile_sizes[0]}
                        {...actor} />
                    )
                }
            </Cast>
        </Container>
    )
}