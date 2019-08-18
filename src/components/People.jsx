import React from 'react';
import profile from '../images/profile.png';
import styled from 'styled-components';
import { peopleFadeInLeft, peopleFadeInRight, peopleFadeInUp, peopleFadeInDown } from './Animation';

const Profile = styled.img`
    border-radius: 50%;
    width: 50px;
    height: 50px;
    background: url(${props => props.url});
    background-size: cover;
    background-position: center;
    box-shadow: 1px 1px 3px 1px rgba(0,0,0,0.4);
    margin: 10px;
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
    height: ${props => props.mobile ? 'auto' : '175px'};
    box-shadow: none;
    margin: 2px;
    border-radius: 5px;
    cursor: pointer;
    animation: 1s ${props => props.left ? (props.mobile ? peopleFadeInDown : peopleFadeInLeft) : (props.mobile ? peopleFadeInUp : peopleFadeInRight) } ease-out both;
    &:hover {
        box-shadow: 1px 1px 3px 1px rgba(0,0,0, 0.4);
    }
`;

export default function People({character, job, size, profile_path, name, i, mobile, left, isCast}) {
    return (
        <Container 
            left={left}
            odd={ i % 2 !== 0}
            mobile={mobile}>
            <Profile url={profile_path ? `https://image.tmdb.org/t/p/${size}/${profile_path}` : profile} />
            <h5 style={{ margin: mobile ? 10 : -2 }}>{name}</h5>
            <p style={{ fontSize: '0.8em',  margin: mobile ? 10 : 2 }}>{isCast ? character : job}</p>
        </Container>
    )
}