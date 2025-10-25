import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const API_URL = "http://localhost:4000/settings";

const Settings = () => {
  const [brandName, setBrandName] = useState("");
  const [maintenance, setMaintenance] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // UI only
  const [emailNotifications, setEmailNotifications] = useState(true); // UI only
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch settings");
        const data = await res.json();
        setBrandName(data.siteTitle || "");
        setMaintenance(!!data.maintenance);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchSettings();
  }, [token]);

  const handleSave = async () => {
    setError("");
    setSuccess(false);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ siteTitle: brandName, maintenance }),
      });
      if (!res.ok) throw new Error("Failed to save settings");
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto" }}>
      <Card elevated>
        <h2>Settings</h2>
        <p>Configure application settings.</p>
        {error && <div style={{ color: "red", marginBottom: 16 }}>{error}</div>}
        {success && (
          <div style={{ color: "green", marginBottom: 16 }}>
            Settings saved!
          </div>
        )}
        {loading ? (
          <div>Loading...</div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 24,
              marginTop: 32,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <label style={{ flex: 1 }}>
                <b>Brand Name</b>
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  style={{
                    width: "100%",
                    marginTop: 8,
                    padding: 8,
                    borderRadius: 4,
                    border: "1px solid #ccc",
                  }}
                />
              </label>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <label style={{ flex: 1 }}>
                <b>Maintenance Mode</b>
                <input
                  type="checkbox"
                  checked={maintenance}
                  onChange={() => setMaintenance((v) => !v)}
                  style={{ marginLeft: 12 }}
                />
              </label>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <label style={{ flex: 1 }}>
                <b>Dark Mode</b>
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={() => setDarkMode((v) => !v)}
                  style={{ marginLeft: 12 }}
                />
                <span style={{ color: "#888", marginLeft: 8 }}>(UI only)</span>
              </label>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <label style={{ flex: 1 }}>
                <b>Email Notifications</b>
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={() => setEmailNotifications((v) => !v)}
                  style={{ marginLeft: 12 }}
                />
                <span style={{ color: "#888", marginLeft: 8 }}>(UI only)</span>
              </label>
            </div>
            <Button type="submit" size="md" style={{ alignSelf: "flex-end" }}>
              Save Settings
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
};

export default Settings;
