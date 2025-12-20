import React, { useState } from "react";
import { Modal, Form, Input, Select, Button } from "antd";

const { Option } = Select;

const CreateAdminModal = ({ visible, onCancel, onCreate }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onCreate(values);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  };

  return (
    <Modal
      title="Create Administrator"
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={400}
      closeIcon
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Full Name:"
          name="fullName"
          rules={[{ required: true, message: "Please enter full name" }]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>

        <Form.Item
          label="Email Address:"
          name="email"
          rules={[
            { required: true, message: "Please enter email address" },
            { type: "email", message: "Please enter a valid email address" },
          ]}
        >
          <Input placeholder="Enter email address" />
        </Form.Item>

        <Form.Item
          label="Password:"
          name="password"
          rules={[{ required: true, message: "Please enter a password" }]}
        >
          <Input.Password placeholder="Enter password" />
        </Form.Item>

        <Form.Item
          label="Location:"
          name="location"
          rules={[{ required: true, message: "Please enter location" }]}
        >
          <Input placeholder="Enter location" />
        </Form.Item>

        <Form.Item
          label="Role:"
          name="role"
          rules={[{ required: true, message: "Please select a role" }]}
        >
          <Select placeholder="Select Role">
            <Option value="Super Administrator">Super Administrator</Option>
            <Option value="Publisher">Publisher</Option>
          </Select>
        </Form.Item>

        <Button
          type="primary"
          block
          style={{
            background: "#004b6e",
            fontWeight: "bold",
            marginTop: 16,
          }}
          onClick={handleOk}
        >
          Create Administrator
        </Button>
      </Form>
    </Modal>
  );
};

export default CreateAdminModal;
