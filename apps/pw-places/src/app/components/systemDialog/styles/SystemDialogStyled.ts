import styled, { centeredContainerStyled, css } from '../../../styles';

export const DialogStyledBorders = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  top: 0;
  left: 0;

  &:before,
  &:after {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    content: '';
  }

  &:before {
    width: calc(100% + 2px);
    height: calc(100% - 2px);
    border-left: 1px solid #76644a;
    border-right: 1px solid #76644a;
  }

  &:after {
    width: 100%;
    height: calc(100% + 2px);
    border-top: 1px solid #e1c39d;
    border-bottom: 1px solid #e1c39d;
  }
`;

export const dialogContainerStyled = css`
  border: 1px solid #2c1c0a;

  &:before,
  &:after {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    content: '';
  }

  &:before {
    width: calc(100% + 2px);
    height: 100%;
    border-left: 1px solid #e1c39d;
    border-right: 1px solid #e1c39d;
  }

  &:after {
    width: calc(100% - 2px);
    height: calc(100% + 2px);
    border-top: 1px solid #76644a;
    border-bottom: 1px solid #76644a;
  }
`;

export const SystemDialogStyledContainer = styled.div`
  position: relative;
  width: 398px;
  height: 68px;

  ${dialogContainerStyled};
  ${centeredContainerStyled};
`;

export const SystemDialogStyledText = styled.span`
  font-size: 18px;
`;
