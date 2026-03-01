import { useCurrentApp } from "@/components/context/app.context";
import { loginAPI } from "@/services/api";
import {
  App,
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  type FormProps,
} from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
type FieldType = {
  username: string;
  password: string;
};

interface IProps {
  openLogin: boolean;
  setOpenLogin: (value: boolean) => void;
}
const LoginModal = (props: IProps) => {
  const navigate = useNavigate();
  const { openLogin, setOpenLogin } = props;
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
    <Modal
      title="Đăng nhập"
      open={openLogin}
      footer={null}
      closable={{ "aria-label": "Custom Close Button" }}
      onCancel={() => setOpenLogin(false)}
      width={400}
    >
      <Form
        layout={"vertical"}
        name="basic"
        style={{ maxWidth: 400 }}
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
    </Modal>
  );
};

export default LoginModal;
