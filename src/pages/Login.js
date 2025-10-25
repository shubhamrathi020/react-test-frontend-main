import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Card from "../components/ui/Card";
import LanguageSwitcher from "../components/LanguageSwitcher";
import ThemeSwitcher from "../components/ThemeSwitcher";

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.primary}10 0%,
    ${(props) => props.theme.colors.surface} 100%
  );
  padding: 1rem;
`;

const LoginCard = styled(Card)`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const LoginTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: 0.5rem;
`;

const LoginSubtitle = styled.p`
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 0.875rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ErrorMessage = styled.div`
  color: ${(props) => props.theme.colors.error};
  font-size: 0.875rem;
  text-align: center;
  padding: 0.75rem;
  background-color: ${(props) => props.theme.colors.error}10;
  border-radius: 0.5rem;
  border: 1px solid ${(props) => props.theme.colors.error}20;
`;

const TestUsers = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.surface};
  border-radius: 0.5rem;
  border: 1px solid ${(props) => props.theme.colors.border};
`;

const TestUsersTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: 0.75rem;
`;

const TestUser = styled.div`
  font-size: 0.75rem;
  color: ${(props) => props.theme.colors.text.secondary};
  margin-bottom: 0.25rem;

  &:last-child {
    margin-bottom: 0;
  }
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
`;

const HeaderControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const API_URL = "http://localhost:4000/api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Invalid credentials");
      }

      const data = await res.json();
      // Defensive: support both { user, token } and flat { username, role, token }
      const user = data.user || {
        username: data.username,
        role: data.role,
        // add other user fields as needed
      };
      const token = data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(login({ user, token }));
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestUser = (testUsername, testPassword) => {
    setUsername(testUsername);
    setPassword(testPassword);
  };

  const TEST_USERS = [
    {
      username: "admin",
      password: "admin",
      label: "👑 admin / admin (Admin role)",
    },
    { username: "user", password: "user", label: "👤 user / user (User role)" },
    {
      username: "moderator",
      password: "moderator",
      label: "🛡️ moderator / moderator (Moderator role)",
    },
    {
      username: "superadmin",
      password: "superadmin",
      label: "🦸 superadmin / superadmin (Superadmin role)",
    },
    {
      username: "editor",
      password: "editor",
      label: "✍️ editor / editor (Editor role)",
    },
    {
      username: "viewer",
      password: "viewer",
      label: "👁️ viewer / viewer (Viewer role)",
    },
    {
      username: "guest",
      password: "guest",
      label: "🚪 guest / guest (Guest role)",
    },
  ];

  return (
    <>
      <Header>
        <div>
          <Link to="/" style={{ textDecoration: "none" }}>
            <h2 style={{ margin: 0, color: "#3B82F6", fontWeight: 700 }}>
              Modern React App
            </h2>
          </Link>
        </div>
        <HeaderControls>
          <LanguageSwitcher />
          <ThemeSwitcher />
        </HeaderControls>
      </Header>

      <LoginContainer>
        <LoginCard elevated>
          <LoginHeader>
            <LoginTitle>{t("login")}</LoginTitle>
            <LoginSubtitle>Sign in to your account to continue</LoginSubtitle>
          </LoginHeader>

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Input
                label="Username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={isLoading}
              />
            </FormGroup>

            <FormGroup>
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </FormGroup>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Button type="submit" fullWidth disabled={isLoading}>
              {isLoading ? "Signing in..." : t("login")}
            </Button>
          </Form>

          <TestUsers>
            <TestUsersTitle>Test Users (Click to fill):</TestUsersTitle>
            {TEST_USERS.map((u) => (
              <TestUser
                key={u.username}
                onClick={() => handleTestUser(u.username, u.password)}
                style={{ cursor: "pointer" }}
              >
                {u.label}
              </TestUser>
            ))}
          </TestUsers>
        </LoginCard>
      </LoginContainer>
    </>
  );
};

export default Login;
