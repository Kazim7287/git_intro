import { useEffect, useState } from "react";
import { Card, List, Spin, Button, message } from "antd";
import api from "../../api/axios";

const StudentDashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/opportunities").then((res) => {
      setData(res.data.opportunities);
    });
  }, []);

  if (!data) return <Spin />;

  return (
    <List
      dataSource={data}
      renderItem={(item) => (
        <Card title={item.title} style={{ marginBottom: 16 }}>
          <p>{item.description}</p>
          <small>Type: {item.type}</small>
          <br />
          <Button
            type="primary"
            style={{ marginTop: 10 }}
            onClick={async () => {
              const msg = prompt("Enter your application message");
              if (!msg) return;
              try {
                await api.post("/applications", {
                  opportunity_id: item.id,
                  message: msg,
                });
                message.success("Applied successfully!");
              } catch (err) {
                message.error(err.response?.data?.message || "Failed to apply");
              }
            }}
          >
            Apply
          </Button>
        </Card>
      )}
    />
  );
};

export default StudentDashboard;
