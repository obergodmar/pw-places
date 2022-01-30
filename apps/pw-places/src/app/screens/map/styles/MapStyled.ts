import { styled, wrapperStyled } from '../../../styles';
import { ASSETS } from '../../../constants';

export const MapStyledBackground = styled.div`
  object-fit: contain;
  background-image: url('${ASSETS}/map.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  ${wrapperStyled};
`;
