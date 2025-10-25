import React from "react";
import { useTheme } from "./ThemeProvider";
import styled from "styled-components";

const ThemeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ToggleLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 0.5rem;
`;

const ToggleSwitch = styled.span`
  position: relative;
  width: 44px;
  height: 24px;
  background: ${(props) => props.theme.colors.surface};
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.colors.border};
  transition: background 0.2s;
  display: inline-block;
`;

const ToggleThumb = styled.span`
  position: absolute;
  top: 2px;
  left: ${(props) => (props.active ? "22px" : "2px")};
  width: 20px;
  height: 20px;
  background: ${(props) => props.theme.colors.primary};
  border-radius: 50%;
  transition: left 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.1rem;
`;

const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

const ThemeSwitcher = () => {
  const { mode, setMode } = useTheme();
  const isDark = mode === "dark";

  return (
    <ThemeContainer title="Toggle dark/light mode">
      <ToggleLabel>
        <ToggleSwitch>
          <ToggleThumb active={isDark}>{isDark ? "🌙" : "☀️"}</ToggleThumb>
        </ToggleSwitch>
        <input
          type="checkbox"
          checked={isDark}
          onChange={() => setMode(isDark ? "light" : "dark")}
          style={{ display: "none" }}
          aria-label="Toggle dark/light mode"
        />
        <VisuallyHidden>Toggle dark/light mode</VisuallyHidden>
      </ToggleLabel>
    </ThemeContainer>
  );
};

export default ThemeSwitcher;
