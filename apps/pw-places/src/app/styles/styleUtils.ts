import { css, ThemeType } from './theme';
import {
  CSSObject,
  Interpolation,
  InterpolationFunction,
  ThemeProps,
} from 'styled-components';

export const createTransition = (duration: number, transitionFunc: string) => {
  const transitionValue = `${duration}ms`;

  return (...props: string[]) => css`
    transition: ${props.reduce((res, prop, idx, arr) => {
      res += `${prop} ${transitionValue} ${transitionFunc}${
        arr.length > 1 && arr.length - 1 !== idx ? ',' : ''
      }`;

      return res;
    }, '')};
  `;
};

export const defaultTransition = createTransition(200, 'ease-out');

export const hover = (
  first:
    | CSSObject
    | TemplateStringsArray
    | InterpolationFunction<ThemeProps<ThemeType>>,
  ...interpolations: Interpolation<ThemeProps<ThemeType>>[]
) => css`
  &:focus,
  &:active {
    outline: none;
  }

  &:hover,
  &:focus,
  &:active {
    ${css(first, ...interpolations)}
  }
`;

export const centeredContainerStyled = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const wrapperStyled = css`
  width: 100%;
  height: 100%;

  ${centeredContainerStyled};
`;

export const fontStyled = css`
  font-family: 'FZXiHei I-Z08S', sans-serif;
  font-weight: normal;
  font-style: normal;
`;
