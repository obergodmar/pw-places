import baseStyled, {
  css as baseCss,
  ThemedCssFunction,
  ThemedStyledInterface,
} from 'styled-components';

export const theme = {
  colors: {
    primary: '',
    secondary: '',
  },
};

export type ThemeType = typeof theme;

export interface ITheme {
  theme: ThemeType;
}

export const styled: ThemedStyledInterface<ITheme> = baseStyled;

export const css: ThemedCssFunction<ITheme> = baseCss;
