import { registerAPI } from "services/api";
import { App, Button, Col, Form, Input, Row, type FormProps } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type FieldType = {
  fullname: string;
  email: string;
  password: string;
  phone: string;
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  const { message } = App.useApp();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setIsSubmit(true);
    const { fullname, email, password, phone } = values;
    const res = await registerAPI(fullname, email, password, phone);
    if (res.data) {
      message.success("Đăng ký thành công!");
      navigate("/login");
    } else {
      message.error(res.message);
    }
    setIsSubmit(false);
  };

  return (
    <Row gutter={16} justify="center">
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
          Đăng Ký Tài Khoản
        </h3>
        <Form
          layout={"vertical"}
          name="basic"
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Họ tên"
            name="fullname"
            rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Email"
            name="email"
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

          <Form.Item<FieldType>
            label="Số điện thoại"
            name="phone"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số điện thoại",
              },
              {
                pattern: /^0\d{9}$/,
                message: "Số điện thoại không hợp lệ!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit" loading={isSubmit}>
              Đăng ký
            </Button>
          </Form.Item>
          <div
            style={{
              textAlign: "center",
              marginTop: "20px",
              paddingTop: "20px",
            }}
          >
            Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default RegisterPage;
