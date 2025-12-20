import React, { useState, useEffect } from "react";
import { Table, Button, Tag, Input } from "antd";
import CreateAdminModal from "../../component/CreateAdminModal/CreateAdminModal";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdmin,
  createAdminApi,
  updateAdminApi,
} from "../../redux/action/Admin";
import { render } from "@testing-library/react";
import moment from "moment";
import EditAdminModal from "../../component/EditAdminModal/EditAdminModal";

const Admin = () => {
  const dispatch = useDispatch();
  const { admins, getAdminLoading, getAdminError } = useSelector(
    (state) => state.GET_ADMIN
  );
  const { createAdmin, createAdminLoading, createAdminError } = useSelector(
    (state) => state.CREATE_ADMIN
  );
  const { updateAdmin, updateAdminLoading, updateAdminError } = useSelector(
    (state) => state.UPDATE_ADMIN
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  // new state
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  // open edit modal with data
  const handleEdit = (admin) => {
    setSelectedAdmin(admin);
    setIsEditModalVisible(true);
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
    setSelectedAdmin(null);
  };
  const handleEditSubmit = (values) => {
    const updatedAdmin = {
      // if needed by backend
      fullName: values.fullName,
      email: values.email,
      location: values.location,
      role: values.role,
      status: values.status,
    };

    if (values.password && values.password.trim() !== "") {
      updatedAdmin.password = values.password;
    }

    console.log("Final Payload to API:", updatedAdmin);
    dispatch(updateAdminApi(updatedAdmin, selectedAdmin._id));
    setIsEditModalVisible(false);
  };

  const handleCreate = (values) => {
    const newAdmin = JSON.stringify({
      fullName: values.fullName,
      email: values.email,
      location: values.location,
      role: values.role,
      password: values.password,
    });
    console.log(newAdmin);
    dispatch(createAdminApi(newAdmin));

    // setAdmins([newAdmin, ...admins]);
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Administrator ID",

      key: "id",
      render: (_) => <span>AD{_._id.slice(-4).toUpperCase()}</span>,
    },
    {
      title: "Date Created",

      key: "dateCreated",
      render: (_) => <span>{moment(_.createdAt).format("DD/MM/YYYY")}</span>,
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Account Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Active" ? "green" : "volcano"}>
          {status === "Inactive" ? "Suspended" : status}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => <a onClick={() => handleEdit(record)}>Edit</a>,
    },
  ];

  const filteredAdmins = admins.filter((admin) =>
    admin.fullName.toLowerCase().includes(searchText.toLowerCase())
  );
  const getAdminData = () => {
    dispatch(getAdmin());
  };

  useEffect(() => {
    getAdminData();
  }, []);

  useEffect(() => {
    if (createAdmin) {
      getAdminData();
    }
    if (createAdminError) {
      alert(createAdminError);
    }
  }, [createAdmin, createAdminLoading, createAdminError]);

  useEffect(() => {
    if (updateAdmin) {
      getAdminData();
    }
    if (updateAdminError) {
      alert(updateAdminError);
    }
  }, [updateAdmin, updateAdminLoading, updateAdminError]);

  return (
    <>
      {/* Heading and action bar */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Administrators</h4>
        <Button type="primary" onClick={showModal}>
          Create Administrator
        </Button>
      </div>

      {/* Total records */}
      <div className="mb-3 fw-bold text-primary">
        Total Records: {admins.length}
      </div>

      {/* Ads table */}
      <Table
        columns={columns}
        dataSource={filteredAdmins}
        pagination={{ pageSize: 10 }}
        loading={getAdminLoading}
      />

      {/* Edit Ad modal */}
      {/* <EditNewsModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        onFinish={handleFinish}
        form={form}
        news={selectedNews}
      /> */}

      <CreateAdminModal
        visible={isModalVisible}
        onCancel={handleCancel}
        onCreate={handleCreate}
      />

      <EditAdminModal
        visible={isEditModalVisible}
        onCancel={handleEditCancel}
        onSubmit={handleEditSubmit}
        initialValues={selectedAdmin}
      />
    </>
  );
};

export default Admin;
