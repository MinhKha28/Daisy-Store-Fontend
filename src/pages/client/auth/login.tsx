import { useCurrentApp } from "@/components/context/app.context";
import { loginAPI } from "@/services/api";
import { App, Button, Col, Form, Input, Row, type FormProps } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
type FieldType = {
  username: string;
  password: string;
};
const LoginPage = () => {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  const { message, notification } = App.useApp();
  const { setIsAuthenticated, setUser } = useCurrentApp();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setIsSubmit(true);
    const { username, password } = values;
    const res = await loginAPI(username, password);
    if (res.data) {
      setIsAuthenticated(true);
      setUser(res.data.user);
      localStorage.setItem("access_token", res.data.access_token);
      message.success("Đăng nhập thành công!");
      navigate("/");
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description:
          res.message && Array.isArray(res.message)
            ? res.message[0]
            : res.message,
        duration: 5,
      });
    }
    setIsSubmit(false);
  };
  return (
    <Row justify="center">
      <Col
        xs={22}
        md={8}
        lg={6}
        style={{
          border: "1px solid #ccc",
          marginTop: "50px",
          padding: "30px",
          borderRadius: "10px",
        }}
      >
        <h3
          style={{
            textAlign: "center",
            fontSize: "20px",
            marginBottom: "10px",
          }}
        >
          Đăng nhập
        </h3>
        <Form
          layout={"vertical"}
          name="basic"
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Email"
            name="username"
            rules={[
              {
                type: "email",
                message: "Email không hợp lệ!",
              },
              {
                required: true,
                message: "Vui lòng nhập email",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit" loading={isSubmit}>
              Đăng nhập
            </Button>
          </Form.Item>
          <div
            style={{
              textAlign: "center",
              marginTop: "20px",
              paddingTop: "20px",
            }}
          >
            chưa có tài khoản? <Link to="/register">Đăng ký</Link>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default LoginPage;
