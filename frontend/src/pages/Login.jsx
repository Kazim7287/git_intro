import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import { Form, Input, Button, Typography, Alert, Card } from "antd";

const { Title } = Typography;

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

const handleLogin = async (values) => {
  const { email, password } = values;

  try {
    const res = await loginUser({ email, password });

    // assuming backend returns user object
    localStorage.setItem("role", res.user.role);
    const role = res.user.role;
    navigate(`/${role}/dashboard`);
    
  } catch (err) {
    setError(err.response?.data?.message || "Login failed");
  }
};

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f0f2f5",
      }}
    >
      <Card
        style={{ width: 400, padding: "2rem" }}
        bordered={false}
        hoverable
      >
        <Title level={2} style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          Login
        </Title>

        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            style={{ marginBottom: "1rem" }}
          />
        )}

        <Form
          layout="vertical"
          onFinish={handleLogin}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
            ]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>

          <Form.Item style={{ textAlign: "center", marginBottom: 0 }}>
            <Typography.Text>
              Don't have an account? <a href="/register">Register here</a>
            </Typography.Text>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
