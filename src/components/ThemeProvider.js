import React, {
  useState,
  useMemo,
  createContext,
  useContext,
  useEffect,
} from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../theme";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem("theme-mode");
    return savedMode || "light";
  });

  const theme = useMemo(
    () => (mode === "light" ? lightTheme : darkTheme),
    [mode]
  );

  useEffect(() => {
    localStorage.setItem("theme-mode", mode);

    // Apply theme colors to body
    document.body.style.backgroundColor = theme.colors.background;
    document.body.style.color = theme.colors.text.primary;

    // Apply CSS custom properties for global theme access
    document.documentElement.style.setProperty(
      "--primary-color",
      theme.colors.primary
    );
    document.documentElement.style.setProperty(
      "--primary-hover-color",
      theme.colors.primaryHover
    );
    document.documentElement.style.setProperty(
      "--background-color",
      theme.colors.background
    );
    document.documentElement.style.setProperty(
      "--surface-color",
      theme.colors.surface
    );
    document.documentElement.style.setProperty(
      "--text-primary-color",
      theme.colors.text.primary
    );
    document.documentElement.style.setProperty(
      "--text-secondary-color",
      theme.colors.text.secondary
    );
    document.documentElement.style.setProperty(
      "--border-color",
      theme.colors.border
    );
  }, [theme, mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
