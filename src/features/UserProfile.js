import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Card from "../components/ui/Card";

const ProfileCard = styled(Card)`
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.primary}05,
    ${(props) => props.theme.colors.primary}10
  );
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const ProfileAvatar = styled.div`
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
  color: white;
  font-weight: 600;
  font-size: 1.5rem;
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfileName = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: 0.25rem;
`;

const ProfileEmail = styled.div`
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 0.875rem;
`;

const ProfileBio = styled.div`
  color: ${(props) => props.theme.colors.text.secondary};
  line-height: 1.6;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.background};
  border-radius: 0.5rem;
  border: 1px solid ${(props) => props.theme.colors.border};
`;

const ProfileStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const StatItem = styled.div`
  text-align: center;
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.background};
  border-radius: 0.5rem;
  border: 1px solid ${(props) => props.theme.colors.border};
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  font-size: 0.75rem;
  color: ${(props) => props.theme.colors.text.secondary};
  font-weight: 500;
  text-transform: uppercase;
`;

const LoadingSpinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: ${(props) => props.theme.colors.text.secondary};
`;

const ErrorMessage = styled.div`
  color: ${(props) => props.theme.colors.error};
  text-align: center;
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.error}10;
  border-radius: 0.5rem;
  border: 1px solid ${(props) => props.theme.colors.error}20;
`;

const API_URL = "http://localhost:4000/api";

const fetchUserProfile = async (token) => {
  const res = await fetch(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
};

const UserProfile = () => {
  const { token } = useSelector((state) => state.auth);
  const { data, error, isLoading } = useQuery({
    queryKey: ["userProfile", token],
    queryFn: () => fetchUserProfile(token),
    enabled: !!token,
  });

  if (!token) return null;

  if (isLoading) {
    return (
      <ProfileCard elevated>
        <LoadingSpinner>
          <div>Loading profile...</div>
        </LoadingSpinner>
      </ProfileCard>
    );
  }

  if (error) {
    return (
      <ProfileCard elevated>
        <ErrorMessage>Error loading profile: {error.message}</ErrorMessage>
      </ProfileCard>
    );
  }

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <ProfileCard elevated>
      <ProfileHeader>
        <ProfileAvatar>{getInitials(data?.name || "User")}</ProfileAvatar>
        <ProfileInfo>
          <ProfileName>{data?.name || "User Name"}</ProfileName>
          <ProfileEmail>{data?.email || "user@example.com"}</ProfileEmail>
        </ProfileInfo>
      </ProfileHeader>

      <ProfileBio>
        <strong>Bio:</strong>{" "}
        {data?.bio || "No bio available. This user hasn't added a bio yet."}
      </ProfileBio>

      <ProfileStats>
        <StatItem>
          <StatValue>156</StatValue>
          <StatLabel>Posts</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>2.4k</StatValue>
          <StatLabel>Followers</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>892</StatValue>
          <StatLabel>Following</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>89%</StatValue>
          <StatLabel>Activity</StatLabel>
        </StatItem>
      </ProfileStats>

      <div
        style={{
          fontSize: "0.875rem",
          color: "#6B7280",
          textAlign: "center",
          padding: "1rem",
          backgroundColor: "#F9FAFB",
          borderRadius: "0.5rem",
          border: "1px solid #E5E7EB",
        }}
      >
        Profile last updated: {new Date().toLocaleDateString()}
      </div>
    </ProfileCard>
  );
};

export default UserProfile;
