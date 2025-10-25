import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const API_URL = "http://localhost:4000/users";

const roles = [
  "superadmin",
  "admin",
  "moderator",
  "editor",
  "viewer",
  "user",
  "guest",
];
const statuses = ["Active", "Inactive"];

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editRole, setEditRole] = useState(roles[0]);
  const [editStatus, setEditStatus] = useState(statuses[0]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addUser, setAddUser] = useState({
    username: "",
    name: "",
    email: "",
    role: roles[0],
    status: statuses[0],
  });
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState("");
  const token = useSelector((state) => state.auth.token);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(
          data.map((u, i) => ({
            ...u,
            id: i + 1,
            status: u.status || "Active",
          }))
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchUsers();
  }, [token]);

  // Add user
  const handleAddUser = async (e) => {
    e.preventDefault();
    setAddError("");
    setAddLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(addUser),
      });
      if (!res.ok) throw new Error("Failed to add user");
      const newUser = await res.json();
      setUsers([
        ...users,
        {
          ...newUser,
          id: users.length + 1,
          status: newUser.status || "Active",
        },
      ]);
      setAddUser({
        username: "",
        name: "",
        email: "",
        role: roles[0],
        status: statuses[0],
      });
    } catch (err) {
      setAddError(err.message);
    } finally {
      setAddLoading(false);
    }
  };

  // Delete user
  const handleDelete = async (username) => {
    setError("");
    try {
      const res = await fetch(`${API_URL}/${username}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete user");
      setUsers(users.filter((u) => u.username !== username));
    } catch (err) {
      setError(err.message);
    }
  };

  // Edit user (role/status)
  const handleEdit = (user) => {
    setEditingId(user.id);
    setEditRole(user.role);
    setEditStatus(user.status);
  };

  const handleSave = async (id) => {
    const user = users.find((u) => u.id === id);
    setError("");
    try {
      const res = await fetch(`${API_URL}/${user.username}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role: editRole, status: editStatus }),
      });
      if (!res.ok) throw new Error("Failed to update user");
      const updated = await res.json();
      setUsers(users.map((u) => (u.id === id ? { ...u, ...updated } : u)));
      setEditingId(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  return (
    <div style={{ maxWidth: 900, margin: "2rem auto" }}>
      <Card elevated>
        <h2>User Management</h2>
        <p>Manage all users and roles in the system.</p>
        {error && <div style={{ color: "red", marginBottom: 16 }}>{error}</div>}
        <div style={{ margin: "2rem 0" }}>
          <h3>Add New User</h3>
          <form
            onSubmit={handleAddUser}
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <input
              type="text"
              placeholder="Username"
              value={addUser.username}
              onChange={(e) =>
                setAddUser({ ...addUser, username: e.target.value })
              }
              required
              style={{
                flex: 1,
                padding: 8,
                borderRadius: 4,
                border: "1px solid #ccc",
              }}
            />
            <input
              type="text"
              placeholder="Name"
              value={addUser.name}
              onChange={(e) => setAddUser({ ...addUser, name: e.target.value })}
              style={{
                flex: 1,
                padding: 8,
                borderRadius: 4,
                border: "1px solid #ccc",
              }}
            />
            <input
              type="email"
              placeholder="Email"
              value={addUser.email}
              onChange={(e) =>
                setAddUser({ ...addUser, email: e.target.value })
              }
              style={{
                flex: 1,
                padding: 8,
                borderRadius: 4,
                border: "1px solid #ccc",
              }}
            />
            <select
              value={addUser.role}
              onChange={(e) => setAddUser({ ...addUser, role: e.target.value })}
              style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </option>
              ))}
            </select>
            <select
              value={addUser.status}
              onChange={(e) =>
                setAddUser({ ...addUser, status: e.target.value })
              }
              style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <Button type="submit" size="sm" disabled={addLoading}>
              {addLoading ? "Adding..." : "Add"}
            </Button>
          </form>
          {addError && (
            <div style={{ color: "red", marginBottom: 8 }}>{addError}</div>
          )}
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div style={{ marginTop: 32 }}>
            <h3>User List</h3>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: 16,
              }}
            >
              <thead>
                <tr style={{ background: "#f3f4f6" }}>
                  <th style={{ padding: 8, textAlign: "left" }}>Username</th>
                  <th style={{ padding: 8 }}>Name</th>
                  <th style={{ padding: 8 }}>Email</th>
                  <th style={{ padding: 8 }}>Role</th>
                  <th style={{ padding: 8 }}>Status</th>
                  <th style={{ padding: 8 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: 8 }}>{user.username}</td>
                    <td style={{ padding: 8 }}>{user.name || "-"}</td>
                    <td style={{ padding: 8 }}>{user.email || "-"}</td>
                    <td style={{ padding: 8 }}>
                      {editingId === user.id ? (
                        <select
                          value={editRole}
                          onChange={(e) => setEditRole(e.target.value)}
                          style={{
                            padding: 4,
                            borderRadius: 4,
                            border: "1px solid #ccc",
                          }}
                        >
                          {roles.map((role) => (
                            <option key={role} value={role}>
                              {role.charAt(0).toUpperCase() + role.slice(1)}
                            </option>
                          ))}
                        </select>
                      ) : (
                        user.role.charAt(0).toUpperCase() + user.role.slice(1)
                      )}
                    </td>
                    <td style={{ padding: 8 }}>
                      {editingId === user.id ? (
                        <select
                          value={editStatus}
                          onChange={(e) => setEditStatus(e.target.value)}
                          style={{
                            padding: 4,
                            borderRadius: 4,
                            border: "1px solid #ccc",
                          }}
                        >
                          {statuses.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      ) : (
                        user.status
                      )}
                    </td>
                    <td style={{ padding: 8 }}>
                      {editingId === user.id ? (
                        <>
                          <Button size="sm" onClick={() => handleSave(user.id)}>
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={handleCancel}
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button size="sm" onClick={() => handleEdit(user)}>
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => handleDelete(user.username)}
                          >
                            Delete
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      style={{
                        textAlign: "center",
                        padding: 16,
                        color: "#888",
                      }}
                    >
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Users;
