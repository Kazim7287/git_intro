import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";
import { Form, Input, Button, Typography, Alert, Card } from "antd";

const { Title } = Typography;

const Register = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

const handleRegister = async (values) => {
  const { name, email, password, passwordConfirm, role } = values;

  if (password !== passwordConfirm) {
    setError("Passwords do not match");
    return;
  }

  try {
    const res = await registerUser({ name, email, password, role });

    // ✅ STORE TOKEN + ROLE
    localStorage.setItem("token", res.token);
    localStorage.setItem("role", res.user.role);

    navigate("/dashboard");
  } catch (err) {
    setError(err.response?.data?.message || "Registration failed");
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
          Register
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
          onFinish={handleRegister}
        >
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Full Name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
  label="Role"
  name="role"
  rules={[{ required: true, message: "Please select a role" }]}
>
  <select style={{ width: "100%", padding: "8px" }}>
    <option value="student">Student</option>
    <option value="teacher">Teacher</option>
    <option value="institute">Institute</option>
  </select>
</Form.Item>


          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter a password" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="passwordConfirm"
            rules={[{ required: true, message: "Please confirm your password" }]}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>


          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Register
            </Button>
          </Form.Item>

          <Form.Item style={{ textAlign: "center", marginBottom: 0 }}>
            <Typography.Text>
              Already have an account? <a href="/login">Login here</a>
            </Typography.Text>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
