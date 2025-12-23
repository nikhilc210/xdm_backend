import { Modal, Form, Input, Select, Upload, Button } from "antd";
import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useDispatch, useSelector } from "react-redux";
import { uploadFile } from "../../redux/action/File";
const { Option } = Select;

const PublishNewsModal = ({ type, visible, onClose, onPublish }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [contentType, setContentType] = useState(type);
  const [editorContent, setEditorContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleContentTypeChange = (value) => {
    setContentType(value);
  };

  const handleFinish = (values) => {
    const fullValues = {
      ...values,
      content: editorContent, // attach CKEditor content manually
      newsImageUrl: selectedImage, // attach uploaded image URL here
      contentType: contentType,
    };
    console.log("Published News:", fullValues);
    onPublish(fullValues);
    form.resetFields();
    setEditorContent("");

    setSelectedImage(null); // reset image too
  };

  const handleClose = () => {
    onClose();
    form.resetFields();
    setEditorContent("");

    setSelectedImage(null);
  };

  const uploadImage = async (info) => {
    const file = info.file?.originFileObj;
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await dispatch(uploadFile(formData));
      if (res?.status === "success") {
        setSelectedImage(res?.url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title={"Publish " + contentType}
      visible={visible}
      onCancel={handleClose}
      footer={null}
      width={800}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        {contentType === "News" && (
          <>
            <Form.Item label="Category" name="category">
              <Select placeholder="Select Category">
                <Option value="Community Stories">Community Stories</Option>
                <Option value="Politics & Policy">Politics & Policy</Option>
                <Option value="Culture">Culture</Option>
                <Option value="Events">Events</Option>
                <Option value="Interviews">Interviews</Option>
                <Option value="Opinion">Opinion</Option>
                <Option value="Travel & Migration">Travel & Migration</Option>
                <Option value="Visa Updates">Visa Updates</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Section" name="section">
              <Select placeholder="Select Section">
                <Option value="Top Stories">Top Stories</Option>
                <Option value="Diaspora Voices">Diaspora Voices</Option>
                <Option value="Immigration News">Immigration News</Option>
                <Option value="Visa & Travel Guides">
                  Visa & Travel Guides
                </Option>
                <Option value="World News">World News</Option>
              </Select>
            </Form.Item>

            <Form.Item label="News Headline" name="headline">
              <Input />
            </Form.Item>

            <Form.Item label="News Image" name="image">
              <Upload
                maxCount={1}
                listType="text"
                accept=".jpg,.jpeg,.png"
                showUploadList={true}
                multiple={false}
                beforeUpload={() => true}
                customRequest={({ file, onSuccess }) => {
                  uploadImage({ file: { originFileObj: file } });
                  // dummy success callback to avoid warning
                  setTimeout(() => onSuccess("ok"), 0);
                }}
              >
                <Button icon={<UploadOutlined />}>Choose Image</Button>
              </Upload>
            </Form.Item>

            <Form.Item label="News Content">
              <CKEditor
                editor={ClassicEditor}
                data={editorContent}
                config={{
                  licenseKey:
                    "eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3ODQxNTk5OTksImp0aSI6IjAyZjU4YjM0LTFmYTQtNGYzMi1iODU3LWZlZjQyYTU1ODEwYyIsImxpY2Vuc2VkSG9zdHMiOlsiYWRtaW4uY29ycGVybmV3cy5jb20iXSwidXNhZ2VFbmRwb2ludCI6Imh0dHBzOi8vcHJveHktZXZlbnQuY2tlZGl0b3IuY29tIiwiZGlzdHJpYnV0aW9uQ2hhbm5lbCI6WyJjbG91ZCIsImRydXBhbCJdLCJmZWF0dXJlcyI6WyJEUlVQIiwiRTJQIiwiRTJXIl0sInZjIjoiOWNmYTI0MWMifQ.S7q8AB4q9Y3REAtCtTraMLPrhZHtOlVLg4V399HP8zXsa-tYIwtKwI16baLnqtn4Ud6G0g_PS2oz92_OCq3I_g",
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setEditorContent(data);
                }}
              />
            </Form.Item>
          </>
        )}

        {(contentType === "Video" || contentType === "Podcast") && (
          <>
            <Form.Item
              label={contentType === "Video" ? "Video Title" : "Podcast Title"}
              name="videoTitle"
            >
              <Input />
            </Form.Item>
            <Form.Item label="YouTube Video ID" name="youtubeVideoId">
              <Input />
            </Form.Item>
          </>
        )}

        <Form.Item label="Source" name="source">
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Publish News
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PublishNewsModal;
