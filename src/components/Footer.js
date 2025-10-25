import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const FooterWrapper = styled.footer`
  background: ${(p) => p.theme.colors.surface};
  color: ${(p) => p.theme.colors.text.secondary};
  border-top: 1px solid ${(p) => p.theme.colors.border || "#e5e7eb"};
  padding: 2.5rem 1rem;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const Brand = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const BrandTitle = styled.h3`
  margin: 0;
  color: ${(p) => p.theme.colors.text.primary};
`;

const Description = styled.p`
  margin: 0;
  color: ${(p) => p.theme.colors.text.secondary};
  font-size: 0.95rem;
`;

const Links = styled.nav`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const FooterLink = styled(Link)`
  color: ${(p) => p.theme.colors.primary};
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const Bottom = styled.div`
  margin-top: 1.5rem;
  border-top: 1px solid ${(p) => p.theme.colors.border || "#e5e7eb"};
  padding-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(p) => p.theme.colors.text.secondary};

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

const Social = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const SocialButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 6px;
  background: ${(p) => p.theme.colors.surface};
  color: ${(p) => p.theme.colors.primary};
  border: 1px solid ${(p) => p.theme.colors.border || "#e5e7eb"};
  text-decoration: none;

  &:hover {
    transform: translateY(-2px);
  }
`;

export default function Footer() {
  return (
    <FooterWrapper>
      <Container>
        <Brand>
          <BrandTitle>Modern React App</BrandTitle>
          <Description>
            A clean, accessible frontend scaffold with auth, i18n, and theming.
          </Description>
          <Links aria-label="Footer links">
            <FooterLink to="/">Home</FooterLink>
            <FooterLink to="/about">About</FooterLink>
            <FooterLink to="/docs">Docs</FooterLink>
            <FooterLink to="/contact">Contact</FooterLink>
          </Links>
        </Brand>

        <div>
          <h4 style={{ marginTop: 0, color: "inherit" }}>Contact</h4>
          <Description>
            Need help? Reach out at <a href="mailto:support@example.com">support@example.com</a>
          </Description>

          <div style={{ marginTop: "1rem" }}>
            <Social>
              <SocialButton href="#" aria-label="Twitter">
                🐦
              </SocialButton>
              <SocialButton href="#" aria-label="GitHub">
                🐙
              </SocialButton>
              <SocialButton href="#" aria-label="LinkedIn">
                💼
              </SocialButton>
            </Social>
          </div>
        </div>

        <Bottom style={{ gridColumn: "1 / -1" }}>
          <div>© {new Date().getFullYear()} Modern React App</div>
          <div>
            <Links aria-hidden>
              <FooterLink to="/privacy">Privacy</FooterLink>
              <FooterLink to="/terms">Terms</FooterLink>
            </Links>
          </div>
        </Bottom>
      </Container>
    </FooterWrapper>
  );
}
