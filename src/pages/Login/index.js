// src/pages/Login.jsx

import React, { useEffect } from "react";
import { Form, Input, Button, Typography, Card, Row, Col, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "./Login.css";
import IMAGES from "../../utils/images";
import { loginUser } from "../../redux/action/Auth";
const { Title } = Typography;

const Login = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.LOGIN);
  const onFinish = (values) => {
    let payload = JSON.stringify({
      email: values.email,
      password: values.password,
    });
    dispatch(loginUser(payload));
  };

  useEffect(() => {
    if (data) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("id", data.admin.id);
      localStorage.setItem("name", data.admin.name);
      localStorage.setItem("email", data.admin.email);
      localStorage.setItem("role", data.admin.role);

      //navigate("/dashboard");
      window.location.href = "/dashboard";
    }

    if (error) {
      message.error(error);
    }
  }, [data, error]);

  return (
    <Row className="login-container" gutter={0}>
      <Col xs={24} md={14} className="login-left"></Col>

      <Col xs={24} md={10} className="login-right">
        <Card bordered={false}>
          <div className="logo">
            <img src={IMAGES.login_logo} alt="XDiaspora Media" width="220" />
          </div>

          <Title level={3} style={{ textAlign: "center" }}>
            XDiaspora Media Admin Login
          </Title>
          <div className="form-wrapper">
            <Form
              name="admin_login"
              layout="vertical"
              onFinish={onFinish}
              style={{ marginTop: "20px" }}
            >
              <Form.Item
                label="Email Address:"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input placeholder="Enter Email Address" />
              </Form.Item>

              <Form.Item
                label="Password:"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password placeholder="Enter Password" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={loading}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>

          <div className="suspended-info">
            {/* <p>
              Suspended Administrator will get the below message when trying to
              login:
            </p>
            <p style={{ fontStyle: "italic" }}>
              "Your administrator account is suspended. Please contact the
              system administrator or support team for help"
            </p> */}
            <span
              style={{
                color: "red",
              }}
            >
              {error}
            </span>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
