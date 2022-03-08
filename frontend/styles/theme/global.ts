import { createGlobalStyle } from "styled-components";
import { ThemeType } from "./theme";
export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  body {
    align-items: center;
    background: ${({ theme }) => {
			const finalTheme: ThemeType = theme as ThemeType;
			return finalTheme.body;
		}};
    color: ${({ theme }) => {
			const finalTheme: ThemeType = theme as ThemeType;
			return finalTheme.text;
		}};
    margin:0;
    padding:0;
    min-height:100vh;
    transition: all 0.25s linear;
  	font-family: "Kaisei HarunoUmi", serif;
  }
  #__next {
    min-height:100vh!important;
  }
`;
