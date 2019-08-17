import React from 'react';
import profile from '../images/profile.png';
import styled from 'styled-components';

const Profile = styled.img`
    border-radius: 50%;
    width: 50px;
    height: 50px;
    background: url(${props => props.url});
    background-size: cover;
    background-position: center;
    box-shadow: 1px 1px 3px 1px rgba(0,0,0,0.4);
`;

const Container = styled.div`
    width: ${props => props.mobile ? '100vw' : '100px'};
    background: ${props => props.mobile && props.odd ? '#DDD' : 'white'};
    display: flex;
    flex-direction: ${props => props.mobile ? 'row' : 'column'};
    flex-wrap: wrap;
    justify-content: ${props => props.mobile ? 'space-between' : 'flex-start'};
    align-items:  center;
    align-content: center;
    padding: 10px;
    height: ${props => props.mobile ? 'auto' : '175px'};
    box-shadow: none;
    margin: 2px;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        box-shadow: 1px 1px 3px 1px rgba(0,0,0, 0.4);
    }
`;

export default function People({character, size, profile_path, name, i, mobile}) {
    return (
        <Container 
            odd={ i % 2 !== 0}
            mobile={mobile}>
            <Profile url={profile_path ? `https://image.tmdb.org/t/p/${size}/${profile_path}` : profile} />
            <h5 style={{ marginBottom: -5 }}>{name}</h5>
            <p style={{ fontSize: '0.8em'}}>{character}</p>
        </Container>
    )
}