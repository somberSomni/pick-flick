import { keyframes } from 'styled-components';

export const peopleFadeInLeft = keyframes`
  0% {
      opacity: 0;
      transform: translateX(10px);
  }
  100% {
      opacity: 1;
      transform: translateX(0px);
  }
`;

export const peopleFadeInRight = keyframes`
  0% {
      opacity: 0;
      transform: translateX(-10px);
  }
  100% {
      opacity: 1;
      transform: translateX(0px);
  }
`;

export const peopleFadeInUp = keyframes`
  0% {
      opacity: 0;
      transform: translateY(-10px);
  }
  100% {
      opacity: 1;
      transform: translateY(0px);
  }
`;
export const peopleFadeInDown = keyframes`
  0% {
      opacity: 0;
      transform: translateY(10px);
  }
  100% {
      opacity: 1;
      transform: translateY(0px);
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