import React, { useEffect, useState } from "react";
import { Card, Typography, Button, Spin, Alert } from "antd";
import api from "../api/axios";
import { logoutUser } from "../api/auth";

const { Title, Text } = Typography;

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/me");
        setUser(res.data);
      } catch (err) {
        setError("Failed to fetch user data");
      }
    };
    fetchUser();
  }, []);

  if (error) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
        <Alert message={error} type="error" showIcon />
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "50px",
      }}
    >
      <Card
        style={{ width: 500, textAlign: "center", padding: "2rem" }}
        bordered={false}
        hoverable
      >
        <Title level={2}>Welcome, {user.name}</Title>
        <Text>Email: {user.email}</Text>
        <Text strong>Role: {user.role}</Text>


        <div style={{ marginTop: "2rem" }}>
          <Button type="primary" onClick={logoutUser} block>
            Logout
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
