import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { login } from "../store";

const roles = [
  "superadmin",
  "admin",
  "moderator",
  "editor",
  "viewer",
  "user",
  "guest",
];

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  margin: 1rem auto;
  max-width: 600px;
  justify-content: center;
`;

const Label = styled.span`
  font-size: 0.9rem;
  color: #6b7280;
`;

const Select = styled.select`
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  font-size: 1rem;
`;

const RoleSwitcher = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // Only show in development
  if (process.env.NODE_ENV !== "development") return null;

  const handleChange = (e) => {
    const newRole = e.target.value;
    // Simulate a login with the new role
    dispatch(
      login({
        user: { ...user, role: newRole },
        token: "dev-token-" + newRole,
      })
    );
  };

  if (!isAuthenticated) return null;

  return (
    <Container>
      <Label>Switch Role (dev):</Label>
      <Select value={user?.role} onChange={handleChange}>
        {roles.map((role) => (
          <option key={role} value={role}>
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </option>
        ))}
      </Select>
    </Container>
  );
};

export default RoleSwitcher;
