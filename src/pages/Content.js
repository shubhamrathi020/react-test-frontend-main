import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const API_URL = "http://localhost:4000/content";

const Content = () => {
  const [content, setContent] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newStatus, setNewStatus] = useState("Draft");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch content");
        const data = await res.json();
        setContent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchContent();
  }, [token]);

  const handleDelete = (id) => {
    setContent(content.filter((item) => item.id !== id));
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setNewTitle(item.title);
    setNewStatus(item.status);
  };

  const handleSave = (id) => {
    setContent(
      content.map((item) =>
        item.id === id ? { ...item, title: newTitle, status: newStatus } : item
      )
    );
    setEditingId(null);
    setNewTitle("");
    setNewStatus("Draft");
  };

  const handleCreate = async () => {
    if (!newTitle.trim()) return;
    setError("");
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newTitle, body: "" }),
      });
      if (!res.ok) throw new Error("Failed to add content");
      const newItem = await res.json();
      setContent([
        ...content,
        {
          ...newItem,
          status: newStatus,
          date: new Date().toISOString().slice(0, 10),
        },
      ]);
      setNewTitle("");
      setNewStatus("Draft");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "2rem auto" }}>
      <Card elevated>
        <h2>Content Management</h2>
        <p>Create, edit, and manage content.</p>
        {error && <div style={{ color: "red", marginBottom: 16 }}>{error}</div>}
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div style={{ margin: "2rem 0" }}>
              <h3>Create New Content</h3>
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
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  style={{
                    padding: 8,
                    borderRadius: 4,
                    border: "1px solid #ccc",
                  }}
                >
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                </select>
                <Button size="sm" onClick={handleCreate}>
                  Add
                </Button>
              </div>
            </div>
            <div>
              <h3>Content List</h3>
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
                    <th style={{ padding: 8 }}>Author</th>
                    <th style={{ padding: 8 }}>Date</th>
                    <th style={{ padding: 8 }}>Status</th>
                    <th style={{ padding: 8 }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {content.map((item) => (
                    <tr
                      key={item.id}
                      style={{ borderBottom: "1px solid #eee" }}
                    >
                      <td style={{ padding: 8 }}>
                        {editingId === item.id ? (
                          <input
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            style={{
                              padding: 4,
                              borderRadius: 4,
                              border: "1px solid #ccc",
                              width: "100%",
                            }}
                          />
                        ) : (
                          item.title
                        )}
                      </td>
                      <td style={{ padding: 8 }}>{item.author}</td>
                      <td style={{ padding: 8 }}>{item.date || "-"}</td>
                      <td style={{ padding: 8 }}>
                        {editingId === item.id ? (
                          <select
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value)}
                            style={{
                              padding: 4,
                              borderRadius: 4,
                              border: "1px solid #ccc",
                            }}
                          >
                            <option value="Draft">Draft</option>
                            <option value="Published">Published</option>
                          </select>
                        ) : (
                          item.status || "Draft"
                        )}
                      </td>
                      <td style={{ padding: 8 }}>
                        {editingId === item.id ? (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleSave(item.id)}
                            >
                              Save
                            </Button>
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => setEditingId(null)}
                            >
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button size="sm" onClick={() => handleEdit(item)}>
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="danger"
                              onClick={() => handleDelete(item.id)}
                            >
                              Delete
                            </Button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                  {content.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        style={{
                          textAlign: "center",
                          padding: 16,
                          color: "#888",
                        }}
                      >
                        No content available.
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

export default Content;
