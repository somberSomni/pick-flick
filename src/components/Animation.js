import { keyframes } from 'styled-components';

export const peopleFadeIn = keyframes`
  0% {
      opacity: 0;
      
  }
  100% {
      opacity: 1;
  }
`;

export const moveUp = keyframes`
  0% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(0px);
  }
`;