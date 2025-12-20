import { useState, useEffect } from "react";
import { Button, Form } from "antd";
import NewsTable from "../../component/NewsTable/NewsTable";
import EditNewsModal from "../../component/EditNewsModal/EditNewsModal";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewsApi,
  deleteNewsApi,
  getNews,
  updateNewsApi,
} from "../../redux/action/News";
import PublishNewsModal from "../../component/PublishNewsModal/PublishNewsModal";
const dummyData = [
  {
    id: "A7X9P3KD5T",
    date: "25/03/2025",
    headline: "INEC Announces Results",
    category: "Politics",
    section: "Top Stories",
    views: 248,
  },
  {
    id: "Z4M8N2XY72",
    date: "25/03/2025",
    headline: "NASS Passes New Bill",
    category: "Business",
    section: "Politics",
    views: 250,
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const { news, loadingNews, errorNews } = useSelector((state) => state.NEWS);
  const { createNews, createNewsLoading, createNewsError } = useSelector(
    (state) => state.CREATE_NEWS
  );
  const { updateNews, updateNewsLoading, updateNewsError } = useSelector(
    (state) => state.UPDATE_NEWS
  );
  const { deleteNews, deleteNewsLoading, deleteNewsError } = useSelector(
    (state) => state.DELETE_NEWS
  );
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [publishModalVisible, setPublishModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleEdit = (record) => {
    setSelectedNews(record);
    form.setFieldsValue(record);
    setEditModalVisible(true);
  };

  const handleFinish = (values) => {
    if (!selectedNews || !selectedNews._id) {
      console.error("No news selected for editing");
      return;
    }

    const updatedValues = {
      ...selectedNews,
      ...values,
    };
    dispatch(updateNewsApi(updatedValues, selectedNews._id));
    setEditModalVisible(false);
  };

  const handleDelete = (id) => {
    console.log("Deleted news ID:", id);

    dispatch(deleteNewsApi(id));
    // In production: call API or remove from state
  };

  const getNewsData = () => {
    dispatch(getNews());
  };

  useEffect(() => {
    getNewsData();
  }, []);

  useEffect(() => {
    if (createNews) {
      dispatch(getNewsData);
    }
    if (createNewsError) {
      alert(createNewsError);
    }
  }, [createNews, createNewsLoading, createNewsError]);

  useEffect(() => {
    if (updateNews) {
      dispatch(getNewsData);
    }
    if (updateNewsError) {
      alert(createNewsError);
    }
  }, [updateNews, updateNewsLoading, updateNewsError]);

  useEffect(() => {
    if (deleteNews) {
      dispatch(getNewsData);
    }
    if (deleteNewsError) {
      alert(deleteNewsError);
    }
  }, [deleteNews, deleteNewsLoading, deleteNewsError]);

  return (
    <>
      {/* Heading and action bar */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">News</h4>
        <Button type="primary" onClick={() => setPublishModalVisible(true)}>
          Publish News
        </Button>
      </div>

      {/* Total records */}
      <div className="mb-3 fw-bold text-primary">
        Total Records:{" "}
        {news.filter((item) => item.contentType === "News").length}
      </div>

      {/* News table */}
      <NewsTable
        data={news?.filter((item) => item.contentType === "News")}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Edit news modal */}
      <EditNewsModal
        type={"News"}
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        onFinish={handleFinish}
        form={form}
        onDelete={handleDelete}
        news={selectedNews}
      />
      <PublishNewsModal
        type={"News"}
        visible={publishModalVisible}
        onClose={() => setPublishModalVisible(false)}
        onPublish={(values) => {
          console.log("Publish API Call Here", values);
          setPublishModalVisible(false);
          dispatch(createNewsApi(values));
        }}
      />
    </>
  );
};

export default Dashboard;
