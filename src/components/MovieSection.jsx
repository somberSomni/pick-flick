import styled from 'styled-components';

const MovieSection = styled.div`
    border-bottom: 2px solid ${props => props.color || '#CCC'};
    padding-bottom: 10px;
`;

export default MovieSection;