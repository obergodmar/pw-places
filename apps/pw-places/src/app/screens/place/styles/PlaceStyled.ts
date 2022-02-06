import styled, { defaultTransition, wrapperStyled } from '../../../styles';
import { loaders } from '../../../../assets';

export const PlaceStyledWrapper = styled.div`
  ${wrapperStyled};

  background-image: url('${loaders[
    Math.floor(Math.random() * loaders.length)
  ]}');

  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;

export const PlaceImage = styled.img`
  object-position: center;
  object-fit: contain;

  width: 100%;
  height: 100%;
`;

export const PlaceLoadingIndicatorSVG = styled.svg.attrs({
  viewBox: '0 0 1280 1024',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
})`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

interface IPlaceLoadingIndicatorProps {
  width: number;
  height: number;
  left: number;
  top: number;
}

export const PlaceLoadingIndicatorContainer = styled.div.attrs(
  ({ ...style }: IPlaceLoadingIndicatorProps) => ({
    style,
  })
)<IPlaceLoadingIndicatorProps>`
  position: absolute;
`;

export const PlaceLoadingIndicator = styled.div.attrs({
  id: 'indicator',
})`
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;

  ${defaultTransition('width')};
`;
