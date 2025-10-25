import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const API_URL = "http://localhost:4000/reports";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newData, setNewData] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch reports");
        const data = await res.json();
        setReports(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchReports();
  }, [token]);

  const handleAddReport = async () => {
    if (!newTitle.trim() || !newData.trim()) return;
    setError("");
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newTitle, data: newData }),
      });
      if (!res.ok) throw new Error("Failed to add report");
      const newReport = await res.json();
      setReports([...reports, newReport]);
      setNewTitle("");
      setNewData("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "2rem auto" }}>
      <Card elevated>
        <h2>Reports & Analytics</h2>
        <p>View analytics and reports.</p>
        {error && <div style={{ color: "red", marginBottom: 16 }}>{error}</div>}
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div style={{ margin: "2rem 0" }}>
              <h3>Add New Report</h3>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <input
                  type="text"
                  placeholder="Title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  style={{
                    flex: 1,
                    padding: 8,
                    borderRadius: 4,
                    border: "1px solid #ccc",
                  }}
                />
                <input
                  type="text"
                  placeholder="Data"
                  value={newData}
                  onChange={(e) => setNewData(e.target.value)}
                  style={{
                    flex: 2,
                    padding: 8,
                    borderRadius: 4,
                    border: "1px solid #ccc",
                  }}
                />
                <Button size="sm" onClick={handleAddReport}>
                  Add
                </Button>
              </div>
            </div>
            <div>
              <h3>Report List</h3>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  marginTop: 16,
                }}
              >
                <thead>
                  <tr style={{ background: "#f3f4f6" }}>
                    <th style={{ padding: 8, textAlign: "left" }}>Title</th>
                    <th style={{ padding: 8 }}>Data</th>
                    <th style={{ padding: 8 }}>Created By</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((report) => (
                    <tr
                      key={report.id}
                      style={{ borderBottom: "1px solid #eee" }}
                    >
                      <td style={{ padding: 8 }}>{report.title}</td>
                      <td style={{ padding: 8 }}>{report.data}</td>
                      <td style={{ padding: 8 }}>{report.createdBy}</td>
                    </tr>
                  ))}
                  {reports.length === 0 && (
                    <tr>
                      <td
                        colSpan={3}
                        style={{
                          textAlign: "center",
                          padding: 16,
                          color: "#888",
                        }}
                      >
                        No reports available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default Reports;
