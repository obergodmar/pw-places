import styled, {
  centeredContainerStyled,
  defaultTransition,
  fontStyled,
  hover,
} from '../../../../../styles';
import { dialogContainerStyled } from '../../../../../components/systemDialog/styles/SystemDialogStyled';

export const PointStyledWrapper = styled.g`
  transform-origin: 50% 50%;
  transform-box: fill-box;

  ${defaultTransition('transform')};

  ${hover`
    transform: scale(1.2);
  `};
`;

interface IPointTooltipProps {
  top: number;
  left: number;
}

export const PointTooltip = styled.div.attrs(
  ({ ...style }: IPointTooltipProps) => ({
    style,
  })
)<IPointTooltipProps>`
  ${fontStyled};

  font-size: 13px;
  z-index: 1;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  height: 20px;
  padding: 5px 2px;
  border-radius: 2px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 1), inset 0 0 0 2px rgba(0, 0, 0, 1);

  ${dialogContainerStyled};
  ${centeredContainerStyled};
`;
