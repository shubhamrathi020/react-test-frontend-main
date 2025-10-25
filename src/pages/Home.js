import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import LanguageSwitcher from "../components/LanguageSwitcher";
import ThemeSwitcher from "../components/ThemeSwitcher";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.primary}10 0%,
    ${(props) => props.theme.colors.surface} 100%
  );
  position: relative;
  overflow: hidden;
`;

const HeroContent = styled.div`
  text-align: center;
  max-width: 800px;
  padding: 2rem;
  z-index: 1;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: 1.5rem;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: ${(props) => props.theme.colors.text.secondary};
  margin-bottom: 2rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

const HeroActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const Header = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
`;

const HeaderControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const FeaturesSection = styled.section`
  padding: 4rem 2rem;
  background-color: ${(props) => props.theme.colors.background};
`;

const FeaturesGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const FeatureCard = styled(Card)`
  text-align: center;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-4px);
  }
`;

const FeatureIcon = styled.div`
  width: 4rem;
  height: 4rem;
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.primary},
    ${(props) => props.theme.colors.primaryHover}
  );
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  font-size: 1.5rem;
  color: white;
`;

const Home = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const features = [
    {
      icon: "🔐",
      title: "Secure Authentication",
      description: "Role-based access control with secure login system",
    },
    {
      icon: "🌍",
      title: "Internationalization",
      description: "Multi-language support with RTL layout support",
    },
    {
      icon: "🎨",
      title: "Theme System",
      description: "Light and dark themes with smooth transitions",
    },
    {
      icon: "📊",
      title: "Modern Dashboard",
      description: "Beautiful and responsive dashboard interface",
    },
    {
      icon: "⚡",
      title: "Performance",
      description: "Optimized with React Query and Redux Toolkit",
    },
    {
      icon: "📱",
      title: "Responsive Design",
      description: "Works perfectly on all devices and screen sizes",
    },
  ];

  return (
    <>
      <Header>
        <div>
          <h2 style={{ margin: 0, color: "#3B82F6", fontWeight: 700 }}>
            Modern React App
          </h2>
        </div>
        <HeaderControls>
          <LanguageSwitcher />
          <ThemeSwitcher />
        </HeaderControls>
      </Header>

      <HeroSection>
        <HeroContent>
          <HeroTitle>{t("welcome")}</HeroTitle>
          <HeroTitle>{t("This is dev branch")}</HeroTitle>
          <HeroSubtitle>
            A modern React application with authentication,
            internationalization, theme switching, and role-based access
            control. Built with the latest technologies and best practices.
          </HeroSubtitle>
          <HeroActions>
            {isAuthenticated ? (
              <Button as={Link} to="/dashboard" size="lg">
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Button as={Link} to="/login" size="lg">
                  Get Started
                </Button>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </>
            )}
          </HeroActions>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <div
          style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}
        >
          <h2
            style={{
              fontSize: "2.5rem",
              marginBottom: "1rem",
              color: "#111827",
            }}
          >
            Features
          </h2>
          <p
            style={{
              fontSize: "1.125rem",
              color: "#6B7280",
              marginBottom: "2rem",
            }}
          >
            Everything you need to build modern web applications
          </p>
        </div>

        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard key={index} elevated>
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <h3 style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>
                {feature.title}
              </h3>
              <p style={{ color: "#6B7280", lineHeight: "1.6" }}>
                {feature.description}
              </p>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </FeaturesSection>
    </>
  );
};

export default Home;
