import styled, { css, fontStyled } from '../../../../styles';
import { PanelModesEnum } from '../../panel';

const colors: { [key: string]: { border: string; shadow: string } } = {
  horizontal: {
    border: 'rgba(253, 231, 189, 0.6)',
    shadow: 'rgba(33, 35, 29, 0.5)',
  },
};

interface ICellStyledProps {
  mode: PanelModesEnum;
}

export const CellStyled = styled.div<ICellStyledProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;

  border-radius: 3px;
  ${({ mode }) => {
    const { border, shadow } = colors[mode];

    return css`
      border: 1px solid ${border};
      box-shadow: 0 0 0 1px ${shadow}, 0 0 0 2px ${shadow} inset;

      ${mode === PanelModesEnum.horizontal
        ? css`
            background: rgb(255, 255, 255);
            background: linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.25) 0%,
              rgba(255, 255, 255, 0) 30%,
              rgba(255, 255, 255, 0) 50%,
              rgba(255, 255, 255, 0) 70%,
              rgba(255, 119, 60, 0.15) 100%
            );

            & + & {
              margin-left: 1px;
            }
          `
        : css``}
    `;
  }}
`;

export const CellNumber = styled.span`
  pointer-events: none;
  user-select: none;
  position: absolute;
  ${fontStyled};

  color: white;
  font-size: 12px;

  bottom: 0;
  right: 3px;
`;

export const CellItem = styled.img`
  border: 1px solid #a5a6a5;
  box-shadow: 0 0 0 1px black;
`;
