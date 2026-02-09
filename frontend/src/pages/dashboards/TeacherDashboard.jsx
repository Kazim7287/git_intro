import { useEffect, useState } from "react";
import { Form, Input, Button, Select, Card, message, List, Spin } from "antd";
import api from "../../api/axios";

const { TextArea } = Input;

const TeacherDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch applications
  useEffect(() => {
    api.get("/applications")
      .then((res) => {
        setApplications(res.data.applications);
        setLoading(false);
      })
      .catch((err) => {
        message.error("Failed to fetch applications");
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (values) => {
    try {
      await api.post("/opportunities", values);
      message.success("Opportunity created");
    } catch (err) {
      message.error(err.response?.data?.message || "Failed to create opportunity");
    }
  };

  if (loading) return <Spin />;

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      {/* Post Opportunity Form */}
      <Card title="Post Opportunity" style={{ marginBottom: 20 }}>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Title" name="title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Description" name="description" rules={[{ required: true }]}>
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item label="Type" name="type" rules={[{ required: true }]}>
            <Select
              options={[
                { value: "class", label: "Class" },
                { value: "tuition", label: "Tuition" },
                { value: "project", label: "Project" },
              ]}
            />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form>
      </Card>

      {/* Applications List */}
      <Card title="Student Applications">
        {applications.length === 0 ? (
          <p>No applications yet.</p>
        ) : (
          <List
            dataSource={applications}
            renderItem={(item) => (
              <Card
                size="small"
                title={item.user.name}
                style={{ marginBottom: 10 }}
              >
                <p><b>Opportunity:</b> {item.opportunity.title}</p>
                <p><b>Message:</b> {item.message}</p>
              </Card>
            )}
          />
        )}
      </Card>
    </div>
  );
};

export default TeacherDashboard;
