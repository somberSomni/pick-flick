import React from 'react';
import styled from 'styled-components';
//components
import SiteFeature from './SiteFeature.jsx';

const FooterContainer = styled.div`
    width: 100vw;
    height: auto;
    background: linear-gradient(${props => props.colors[3] || 'white'}, ${props => props.colors[0] || 'rgb(200,0,100)'});
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    padding: 20px 0px;
`;

const InfoContainer = styled.div`
    max-width: 250px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin: 10px;
    color: white;
`;

export default function Footer({colors}) {
    return (
        <FooterContainer colors={colors}>
            <SiteFeature 
                label='Search Any Movie'
                icon='ticket-alt'>
                Find any movie you can imagine. 🔍Search and Discover
            </SiteFeature>
            <SiteFeature 
                label='Easy Navigation'
                icon='route'>
                Minimal Navigation helps you find what you need with relative ease.
            </SiteFeature>
            <InfoContainer>
                <h4>Please Note this is a demo application</h4>
                <p>This site is mobile friendly. All movie data is obtained through 
                    <a target='_blank' href='https://www.themoviedb.org/'>The Movie DB api</a>
                    . This site was made with React and ☕</p>
                <h6>Somber Somni ©️ 2019</h6>
            </InfoContainer>
        </FooterContainer>
    )
}