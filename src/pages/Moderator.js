import React, { useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const initialQueue = [
  {
    id: 1,
    type: "Comment",
    content: "This is a flagged comment.",
    author: "user123",
    reportedBy: "user456",
    time: "2h ago",
  },
  {
    id: 2,
    type: "Post",
    content: "Flagged post content.",
    author: "user789",
    reportedBy: "user101",
    time: "4h ago",
  },
  {
    id: 3,
    type: "Comment",
    content: "Another reported comment.",
    author: "user202",
    reportedBy: "user303",
    time: "6h ago",
  },
];

const Moderator = () => {
  const [queue, setQueue] = useState(initialQueue);

  const handleApprove = (id) => {
    setQueue(queue.filter((item) => item.id !== id));
  };
  const handleReject = (id) => {
    setQueue(queue.filter((item) => item.id !== id));
  };

  return (
    <div style={{ maxWidth: 900, margin: "2rem auto" }}>
      <Card elevated>
        <h2>Moderator Panel</h2>
        <p>Manage content moderation and user reports. (UI demo, no backend)</p>
        <div style={{ margin: "2rem 0" }}>
          <h3>Pending Review Queue</h3>
          {queue.length === 0 && (
            <div style={{ color: "#6B7280", padding: 24, textAlign: "center" }}>
              No items in the moderation queue.
            </div>
          )}
          {queue.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                background: "#f3f4f6",
                borderRadius: 8,
                padding: 16,
                marginBottom: 16,
              }}
            >
              <div style={{ flex: 1 }}>
                <b>
                  {item.type} by {item.author}
                </b>{" "}
                <span style={{ color: "#6B7280", fontSize: 13 }}>
                  ({item.time})
                </span>
                <div style={{ color: "#6B7280", marginTop: 4 }}>
                  {item.content}
                </div>
                <div style={{ color: "#888", fontSize: 13, marginTop: 4 }}>
                  Reported by {item.reportedBy}
                </div>
              </div>
              <Button
                size="sm"
                onClick={() => handleApprove(item.id)}
                style={{
                  background: "#10B981",
                  color: "white",
                  borderColor: "#10B981",
                }}
              >
                Approve
              </Button>
              <Button
                size="sm"
                variant="danger"
                onClick={() => handleReject(item.id)}
              >
                Reject
              </Button>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 32 }}>
          <h3>Recent Moderation Activity</h3>
          <ul style={{ color: "#6B7280", fontSize: 15, marginTop: 12 }}>
            <li>Comment by user123 approved (30 min ago)</li>
            <li>Post by user456 rejected (2 hours ago)</li>
            <li>User789 warned for inappropriate content (4 hours ago)</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default Moderator;
