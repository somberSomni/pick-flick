import React, { useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import anime from 'animejs';
import getArc from '../helpers/angles';

const Rate = styled.h4`
    border-radius: 50%;
    background: #666;
    padding: 5px;
`;

const RatingContainer = styled.h1`
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    margin-top: 0;
    position: absolute;
`;

const VisualContainer = styled.div`
    position: relative;
    width: ${props => props.size || 100}px;
    height: ${props => props.size || 100}px;
`;

export default function Rating({ rating }) {
    return (
        <div>
            <Rate>{rating}</Rate>
        </div>
    )
}

export function VisualRating({ rating }) {
    const [color, setColor] = useState('red');
    const duration = 3000;
    function setAngle(r) {
        return 360 * r/ 10;
    }

    function getColor(r) {
        if(r >= 7.0) {
            return 'green';
        } else if(r >= 4.0 && r < 7.0) {
            return 'yellow';
        } else {
            return 'red';
        }
    }
    const arcRef = useCallback(node => { 
        if(node) {
            anime({
                targets: node,
                strokeDashoffset: [anime.setDashoffset, 0],
                easing: 'easeInOutSine',
                duration,
                delay: 10,
                direction: 'alternate',
                loop: 0
              });
              console.log(rating)
              console.log(rating, 'rating');
            setColor(getColor(rating));
        }
    }, [rating]);
    const width = 100;
    const x = width / 2;
    const y = width / 2;
    const angle = setAngle(rating);
    const radius = (width - 10) / 2;

    return (
        <VisualContainer size={width}>
            <RatingContainer 
                color={color}
                duration={duration}>
                {rating}
            </RatingContainer>
            <svg
                width={width}
                height={width}>
                xmlns="http://www.w3.org/2000/svg">
            { rating ? (angle === 360 ?
                <circle 
                    ref={arcRef}
                    cx={x} 
                    cy={y} 
                    r={radius} 
                    stroke={color}
                    fill="rgba(0,0,0,0)"
                    strokeWidth="4"/> :
                 <path
                 style={{ transition: 'stroke 3s' }}
                ref={arcRef}
                d={getArc(x,y,radius, 0, angle)}
                stroke={color}
                fill="rgba(0,0,0,0)"
                strokeWidth="4"></path>) : null
            }
            </svg>
        </VisualContainer>
    )
}