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
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    transition: all 0.25s linear;
  	font-family: "Kaisei HarunoUmi", serif;
  }
  #root {
    display: flex;
    height: 100%;
    width: 100%;
    max-width: 100%;
  }
  html {
    height: 100%;
  }
`;
