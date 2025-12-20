import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useDispatch } from "react-redux";
import { uploadFile } from "../../redux/action/File";

const { Option } = Select;

const EditNewsModal = ({ type, visible, onClose, onFinish, form, news }) => {
  const [fileList, setFileList] = useState([]);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [contentType, setContentType] = useState(type);

  const dispatch = useDispatch();

  useEffect(() => {
    if (news) {
      if (news.newsImageUrl) {
        setFileList([
          {
            uid: "-1",
            name: "existing-image.jpg",
            status: "done",
            url: news.newsImageUrl,
          },
        ]);
        setUploadedImageUrl(news.newsImageUrl);
      }

      setEditorContent(news.content || "");
    } else {
      setFileList([]);
      setUploadedImageUrl("");
      setEditorContent("");
    }
  }, [news]);

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const uploadImage = async ({ file }) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await dispatch(uploadFile(formData));
      if (res?.status === "success") {
        setUploadedImageUrl(res?.url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleContentTypeChange = (value) => {
    setContentType(value);
    form.resetFields();
    form.setFieldsValue({ contentType: value });

    if (value === "News") {
      // Restore previous data if available
      if (news) {
        setEditorContent(news.content || "");
        if (news.newsImageUrl) {
          setFileList([
            {
              uid: "-1",
              name: "existing-image.jpg",
              status: "done",
              url: news.newsImageUrl,
            },
          ]);
          setUploadedImageUrl(news.newsImageUrl);
        }
      }
    } else {
      // Clear fields not needed for Video/Podcast
      setEditorContent("");
      setFileList([]);
      setUploadedImageUrl("");
    }
  };

  const handleFinish = (values) => {
    const updatedValues = {
      ...values,
      content: contentType === "News" ? editorContent : "",
      newsImageUrl: contentType === "News" ? uploadedImageUrl : "",
    };
    onFinish(updatedValues);
  };

  return (
    <Modal
      title={"Edit " + contentType}
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleFinish}
        initialValues={news}
      >
        {contentType === "News" && (
          <>
            <Form.Item label="Category" name="category">
              <Select placeholder="Select Category">
                <Option value="Business">Business</Option>
                <Option value="Trending">Trending</Option>
                <Option value="Politics">Politics</Option>
                <Option value="World News">World News</Option>
                <Option value="Sports">Sports</Option>
                <Option value="Entertainment">Entertainment</Option>
                <Option value="Fashion">Fashion</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Headline" name="headline">
              <Input />
            </Form.Item>
          </>
        )}

        {(contentType === "Video" || contentType === "Podcast") && (
          <>
            <Form.Item label={contentType + " Title"} name="videoTitle">
              <Input />
            </Form.Item>

            <Form.Item label="YouTube Video ID" name="youtubeVideoId">
              <Input />
            </Form.Item>
          </>
        )}

        {contentType === "News" && (
          <>
            <Form.Item label="Image">
              <Upload
                listType="picture"
                fileList={fileList}
                onChange={handleUploadChange}
                customRequest={({ file, onSuccess }) => {
                  uploadImage({ file });
                  setTimeout(() => onSuccess("ok"), 0);
                }}
                accept="image/*"
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Upload Image</Button>
              </Upload>
            </Form.Item>

            <Form.Item label="Content">
              <CKEditor
                editor={ClassicEditor}
                data={editorContent}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setEditorContent(data);
                }}
              />
            </Form.Item>
          </>
        )}

        <Form.Item label="Source" name="source">
          <Input />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Update {contentType}
        </Button>
      </Form>
    </Modal>
  );
};

export default EditNewsModal;
