import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const LanguageContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
`;

const GlobeIcon = styled.span`
  font-size: 1.2rem;
  margin-right: 0.25rem;
`;

const Dropdown = styled.select`
  padding: 0.5rem 1.5rem 0.5rem 2.2rem;
  border: 1px solid ${(props) => props.theme.colors.border};
  background: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text.primary};
  border-radius: 0.375rem;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: border 0.2s;
  appearance: none;
  outline: none;
  background-image: url('data:image/svg+xml;utf8,<svg fill="%236B7280" height="16" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>');
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  color: ${(props) => props.theme.colors.text.secondary};
  cursor: pointer;
`;

const languages = [
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <LanguageContainer title="Change language">
      <Label htmlFor="language-select">
        <GlobeIcon role="img" aria-label="Language">
          🌐
        </GlobeIcon>
        <Dropdown
          id="language-select"
          value={i18n.language}
          onChange={changeLanguage}
          aria-label="Select language"
        >
          {languages.map((lng) => (
            <option key={lng.code} value={lng.code}>
              {lng.label}
            </option>
          ))}
        </Dropdown>
      </Label>
    </LanguageContainer>
  );
};

export default LanguageSwitcher;
