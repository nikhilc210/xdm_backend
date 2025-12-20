import { useState, useEffect } from "react";
import { Button, Form, Popconfirm, Table, Tag } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import EditNewsModal from "../../component/EditNewsModal/EditNewsModal";
import { deleteAds, getAds } from "../../redux/action/Ads";
import CreateCustomAdModal from "../../component/CreateCustomAdModal/CreateCustomAdModal";

const Ads = () => {
  const dispatch = useDispatch();
  const { ads, loadingAds, errorAds } = useSelector((state) => state.GET_ADS);
  const { adDelete, adDeleteLoading, adDeleteError } = useSelector(
    (state) => state.DELETE_ADS
  );
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [form] = Form.useForm();
  const [createModalVisible, setCreateModalVisible] = useState(false);

  const handleEdit = (record) => {
    setSelectedNews(record);
    form.setFieldsValue(record);
    setEditModalVisible(true);
  };

  const handleFinish = (values) => {
    console.log("Updated news:", values);
    setEditModalVisible(false);
  };

  const handleDelete = (id) => {
    console.log("Deleted ad ID:", id);
    dispatch(deleteAds(id));
  };

  const getNewsData = () => {
    dispatch(getAds());
  };

  useEffect(() => {
    getNewsData();
  }, []);

  // Table columns config
  const columns = [
    {
      title: "Ad ID",
      dataIndex: "code",
      key: "adId",
    },
    {
      title: "Advertiser Name",
      dataIndex: "advertiserName",
      key: "advertiserName",
    },
    {
      title: "Ad Location",
      dataIndex: "adLocation",
      key: "adLocation",
    },
    {
      title: "Ad Image",

      key: "adImageUrl",
      render: (_, record) => (
        <img
          src={_.mobileImageUrl}
          alt="ad"
          style={{
            width: 120,
            height: 60,
            objectFit: "cover",
            borderRadius: 4,
          }}
        />
      ),
    },
    {
      title: "Redirect URL",
      dataIndex: "redirectUrl",
      key: "redirectUrl",
      render: (url) => (
        <a href={url} target="_blank" rel="noopener noreferrer">
          {url}
        </a>
      ),
    },
    {
      title: "Start Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("DD/MM/YYYY"),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (endDate) => moment(endDate).format("DD/MM/YYYY"),
    },
    {
      title: "Status",
      dataIndex: "endDate",
      key: "status",
      render: (endDate) => {
        const isEnded = moment(endDate).isBefore(moment(), "day");
        return (
          <span
            style={{ color: isEnded ? "red" : "limegreen", fontWeight: 600 }}
          >
            {isEnded ? "Ended" : "Active"}
          </span>
        );
      },
    },
    {
      title: "Clicks",
      dataIndex: "clicks",
      key: "clicks",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Popconfirm
            title="Are you sure you want to delete this Ad?"
            onConfirm={() => handleDelete(_._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger className="p-0">
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  useEffect(() => {
    if (adDelete) {
      dispatch(getAds());
    }
  }, [adDelete, adDeleteError, adDeleteLoading]);

  return (
    <>
      {/* Heading and action bar */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Custom Ads</h4>
        <Button type="primary" onClick={() => setCreateModalVisible(true)}>
          Create Custom Ad
        </Button>
      </div>

      {/* Total records */}
      <div className="mb-3 fw-bold text-primary">
        Total Records: {Array.isArray(ads) ? ads.length : 0}
      </div>

      {/* Ads table */}
      <Table
        dataSource={Array.isArray(ads) ? [...ads].reverse() : []}
        columns={columns}
        loading={loadingAds}
        rowKey="adId"
        bordered
      />

      {/* Edit Ad modal */}
      <EditNewsModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        onFinish={handleFinish}
        form={form}
        news={selectedNews}
      />

      <CreateCustomAdModal
        visible={createModalVisible}
        onClose={() => setCreateModalVisible(false)}
        onCreate={(values) => {
          console.log("Created Ad:", values);
          // dispatch or api call here
          setCreateModalVisible(false);
        }}
      />
    </>
  );
};

export default Ads;
