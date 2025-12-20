import React, { useEffect } from "react";
import { Modal, Form, Input, Select } from "antd";

const { Option } = Select;

const EditAdminModal = ({ visible, onCancel, onSubmit, initialValues }) => {
  const [form] = Form.useForm();

  // When initialValues change, reset form
  useEffect(() => {
    if (initialValues) {
      const { password, ...valuesWithoutPassword } = initialValues;
      form.setFieldsValue(valuesWithoutPassword);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const payload = {
          fullName: values.fullName,
          email: values.email,
          location: values.location,
          role: values.role,
          status: values.status,
        };

        // Include password only if filled (create or password reset)
        if (values.password) {
          payload.password = values.password;
        }

        onSubmit(payload);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  };

  return (
    <Modal
      title={initialValues ? "Edit Administrator" : "Create Administrator"}
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      okText={initialValues ? "Update Administrator" : "Create Administrator"}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Full Name"
          name="fullName"
          rules={[{ required: true, message: "Please enter full name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email Address"
          name="email"
          rules={[{ required: true, message: "Please enter email address" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={
            initialValues
              ? [] // no rules when editing
              : [{ required: true, message: "Please enter password" }]
          }
        >
          <Input.Password
            placeholder={initialValues ? "Leave blank to keep unchanged" : ""}
          />
        </Form.Item>
        <Form.Item
          label="Location"
          name="location"
          rules={[{ required: true, message: "Please enter location" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: "Please select role" }]}
        >
          <Select>
            <Option value="Super Administrator">Super Administrator</Option>
            <Option value="Publisher">Publisher</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please select status" }]}
        >
          <Select>
            <Option value="Active">Active</Option>
            <Option value="Inactive">Suspend</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditAdminModal;
