import { styled, wrapperStyled } from '../../../styles';

import MapUrl from '../../../../assets/map.png';

export const MapStyledBackground = styled.div`
  object-fit: contain;
  background-image: url(${MapUrl});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  ${wrapperStyled};
`;
