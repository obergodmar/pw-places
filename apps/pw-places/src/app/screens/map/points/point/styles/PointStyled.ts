import styled, { defaultTransition, hover } from '../../../../../styles';

export const PointStyledWrapper = styled.g`
  transform-origin: 50% 50%;
  transform-box: fill-box;

  ${defaultTransition('transform')};

  ${hover`
    transform: scale(1.2);
  `};
`;
