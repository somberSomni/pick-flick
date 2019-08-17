import React from 'react';
import styled from 'styled-components';
import { VisualRating } from '../components/Rating.jsx';
import Chip from '@material-ui/core/Chip';

const FeatureContainer = styled.section`
    position: relative;
    display: flex;
    flex-direction: ${props => props.mobile ? 'column' : 'row'};
    flex-wrap: wrap;
`;

const FeatureInfo = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    flex-wrap: no-wrap;
    justify-content: center;
    align-items: center;
    align-content: flex-start;
    width: ${props => props.width}
`;

const FeatureHeader = styled.div`
    width: ${props => props.mobile ? '100%' : '60%'};
    height: ${props => props.mobile ? '300px' : 'auto'};
    background: url(${props => props.url});
    background-size: cover;
    background-position-x: center;
`;

const Header = styled.div`
    position: absolute;
    height: 50px;
    width: 100vw;
    background: white;
    x-index: 99;
`;
// const Genres = styled.div`
//     display: flex;
//     flex-direction: row;
//     align-items: center;
//     justify-content: center;
//     width: 100%;
// `;

// const Title = styled.div`
//     display: flex;
//     flex-direction: row;
//     align-items: flex-start;
//     justify-content: center;
//     flex-wrap: wrap;
// `;

export default function Feature({ genres, windowWidth, backdrop_path, title, overview, poster_path, vote_average, size, mobile }) {
    return (
        <FeatureContainer mobile={windowWidth < 800}>
            <FeatureHeader 
                url={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
                mobile={windowWidth < 800}></FeatureHeader>
            <FeatureInfo width={windowWidth < 800 ? '100%' : '35%'} >
                <div style={{ 
                    padding: 25, 
                    display: 'flex', 
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center' }}>
                    <h1>{title}</h1>
                    {vote_average === 0 ? 'N/A' : <VisualRating rating={vote_average} />}
                    <p>{overview}</p>
                </div>
            </FeatureInfo>
        </FeatureContainer>
    )
}