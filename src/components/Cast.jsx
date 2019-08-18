import React, { useState } from 'react';
import styled from 'styled-components'
import People from '../components/People.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CastContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Pagination = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const Icon = styled.div`
    margin: 5px 25px;
    opacity: 1;
    transition: opacity 0.5s;
    cursor: pointer;
    &:hover {
        opacity: 0.6;
    }
`;

export default function Cast({ cast, size, mobile, isCast }) {
    const padding = 12;
    const [index, setIndex] = useState(0);
    const [left, setLeft] = useState(false);
    return (
        <Container>
            {mobile ? (index > 0 ? <Icon onClick={() => {
                      if (index > 0) {
                        setIndex(index - 1);
                        setLeft(true);
                    }
                }}> 
                    <p style={{ fontSize: '0.8em', fontStyle: 'italic' }}>See More</p>
                    <FontAwesomeIcon
                        size='2x'
                        icon={['fal', 'chevron-up']} />
                </Icon>:  null) : null}
            <CastContainer>
                {cast.slice(index * padding, (index + 1) * padding).map((actor, i) =>
                    <People
                        key={actor.credit_id}
                        i={i}
                        left={left}
                        isCast={isCast}
                        mobile={mobile}
                        size={size}
                        {...actor} />
                )
                }
            </CastContainer>
            {mobile ?
                (cast.length > padding ? ((index + 1) * 12 < cast.length ? <Icon onClick={() => {
                    if ((index + 1) * 12 < cast.length) {
                        setIndex(index + 1);
                        setLeft(false);
                    }
                }}> 
                    <p style={{ fontSize: '0.8em', fontStyle: 'italic' }}>See More</p>
                    <FontAwesomeIcon
                        size='2x'
                        icon={['fal', 'chevron-down']} />
                </Icon> : null) :  null) :
                (cast.length > padding ? (<Pagination>
                    {index > 0 ? <Icon onClick={() => {
                        if (index > 0) {
                            setIndex(index - 1);
                            setLeft(true);
                        }
                    }}>
                        <FontAwesomeIcon
                            size='2x'
                            icon={['fal', 'arrow-circle-left']} />
                    </Icon> : null}
                    <p style={{ fontSize: '0.8em', fontStyle: 'italic' }}>
                        There are <span style={{ fontWeight: 'bold' }}>{cast.length}</span>  {isCast ? 'cast' : 'crew'} members
                    </p>
                    {(index + 1) * 12 < cast.length ? <Icon onClick={() => {
                        if ((index + 1) * 12 < cast.length) {
                            setIndex(index + 1);
                            setLeft(false);
                        }
                    }}>
                        <FontAwesomeIcon
                            size='2x'
                            icon={['fal', 'arrow-circle-right']} />
                    </Icon> : null}
                </Pagination>) : null )}
        </Container>
    );
}