import React, { useState, useEffect } from "react";
import Card from "../components/ui/Card";

const API_URL = "http://localhost:4000/public";

const Public = () => {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInfo = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch public info");
        const data = await res.json();
        setInfo(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchInfo();
  }, []);

  return (
    <div style={{ maxWidth: 700, margin: "2rem auto" }}>
      <Card elevated>
        <h2>Public Information</h2>
        {error && <div style={{ color: "red", marginBottom: 16 }}>{error}</div>}
        {loading ? (
          <div>Loading...</div>
        ) : info ? (
          <>
            <p style={{ color: "#6B7280" }}>{info.welcome}</p>
            <div style={{ margin: "2rem 0" }}>
              <h3>About</h3>
              <p>{info.about}</p>
            </div>
          </>
        ) : (
          <div>No public info available.</div>
        )}
      </Card>
    </div>
  );
};

export default Public;
