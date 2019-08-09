import React, { useCallback } from 'react';
import styled from 'styled-components';

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
    const canvasRef = useCallback(() => { });
    return (
        <div>
            <RatingContainer>{rating}</RatingContainer>
            <canvas
                width={100}
                height={100}
                ref={canvasRef}></canvas>
        </div>
    )
}