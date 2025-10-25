import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Card from "../components/ui/Card";
import UserProfile from "../features/UserProfile";

const mockStats = [
  { label: "Tasks Completed", value: 42 },
  { label: "Messages", value: 7 },
  { label: "Notifications", value: 3 },
  { label: "Last Login", value: "2024-06-05" },
];

const DashboardContainer = styled.div`
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.surface};
  padding: 2rem 1rem;
`;

const DashboardContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const DashboardHeader = styled.div`
  margin-bottom: 2rem;
`;

const DashboardTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: 0.5rem;
`;

const DashboardSubtitle = styled.p`
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 1.125rem;
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const StatCard = styled(Card)`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 0.875rem;
  font-weight: 500;
`;

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <DashboardContainer>
      <DashboardContent>
        <DashboardHeader>
          <DashboardTitle>Dashboard</DashboardTitle>
          <DashboardSubtitle>
            Welcome back, <b>{user?.username}</b>! Here’s your account overview.
          </DashboardSubtitle>
        </DashboardHeader>

        <DashboardGrid>
          {mockStats.map((stat) => (
            <StatCard key={stat.label} elevated>
              <StatNumber>{stat.value}</StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </DashboardGrid>

        <Card elevated>
          <h3>Recent Activity</h3>
          <ul style={{ color: "#6B7280", fontSize: 15, marginTop: 12 }}>
            <li>Logged in from new device (today)</li>
            <li>Completed profile update (yesterday)</li>
            <li>Sent 2 messages (this week)</li>
            <li>Checked notifications (this week)</li>
          </ul>
        </Card>

        <div style={{ marginTop: 32 }}>
          <UserProfile />
        </div>
      </DashboardContent>
    </DashboardContainer>
  );
};

export default Dashboard;
