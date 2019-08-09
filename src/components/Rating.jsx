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
    border-radius: 50%;
    padding: 5px;
`;
export default function Rating({ rating }) {
    return (
        <div>
            <Rate>{rating}</Rate>
        </div>
    )
}

export function VisualRating({ rating }) {
    const [color, setColor] = useState('');
    const arcRef = useCallback(node => { 
        if(node) {
            anime({
                targets: node,
                strokeDashoffset: [anime.setDashoffset, 0],
                easing: 'easeInOutSine',
                duration: 1500,
                delay: 10,
                direction: 'alternate',
                loop: 1
              });
        }
        console.log(node);
    }, []);
    const width = 100;
    const x = 50;
    const y = 50;
    const angle = 80;
    const radius = (width - 10) / 2;
    return (
        <div>
            <RatingContainer>{rating}</RatingContainer>
            <svg
                width={width}
                height={width}>
                xmlns="http://www.w3.org/2000/svg">
            { angle === 360 ?
                <circle 
                    ref={arcRef}
                    cx={x} 
                    cy={y} 
                    r={radius} 
                    stroke="black" 
                    fill="rgba(0,0,0,0)"
                    strokeWidth="4"/> :
                 <path
                ref={arcRef}
                d={getArc(x,y,radius, 0, angle)}
                stroke="black"
                fill="rgba(0,0,0,0)"
                strokeWidth="4"></path>
            }
            </svg>
        </div>
    )
}