import React from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const mockSystemInfo = [
  { label: "System Uptime", value: "99.99%" },
  { label: "Active Users", value: 1280 },
  { label: "Pending Reviews", value: 12 },
  { label: "Last Backup", value: "2024-06-04" },
];

const Admin = () => {
  return (
    <div style={{ maxWidth: 900, margin: "2rem auto" }}>
      <Card elevated>
        <h2>Admin Panel</h2>
        <p>
          Manage your application, users, and system settings. (UI demo, no
          backend)
        </p>
        <div
          style={{
            display: "flex",
            gap: 24,
            margin: "2rem 0",
            flexWrap: "wrap",
          }}
        >
          {mockSystemInfo.map((info) => (
            <div
              key={info.label}
              style={{
                flex: "1 1 180px",
                background: "#f3f4f6",
                borderRadius: 8,
                padding: 24,
                textAlign: "center",
                minWidth: 140,
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 700, color: "#3B82F6" }}>
                {info.value}
              </div>
              <div style={{ color: "#6B7280", fontSize: 14 }}>{info.label}</div>
            </div>
          ))}
        </div>
        <div style={{ margin: "2rem 0" }}>
          <h3>Admin Actions</h3>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Button variant="outline">Run System Backup</Button>
            <Button variant="outline">Review User Reports</Button>
            <Button variant="outline">Manage Integrations</Button>
            <Button variant="outline">View Logs</Button>
          </div>
        </div>
        <div style={{ marginTop: 32 }}>
          <h3>System Announcements</h3>
          <ul style={{ color: "#6B7280", fontSize: 15, marginTop: 12 }}>
            <li>System update scheduled for 2024-06-10</li>
            <li>New integration available: Slack</li>
            <li>Security audit completed successfully</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default Admin;
