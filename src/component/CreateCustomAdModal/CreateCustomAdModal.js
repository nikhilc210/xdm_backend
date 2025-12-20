import {
  Modal,
  Form,
  Input,
  Select,
  Upload,
  Button,
  DatePicker,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { uploadFile } from "../../redux/action/File";
import { createAds, getAds } from "../../redux/action/Ads";
const { Option } = Select;

const adLocationEnumMap = {
  "Header (Leaderboard)": "HEADER_LEADERBOARD",
  "Top Stories -Middle (Rectangle)": "TOP_STORIES_MIDDLE_RECTANGLE",
  "Top Stories - Bottom (Leaderboard)": "TOP_STORIES_BOTTOM_LEADERBOARD",
  "Editor's Pick - Top (Rectangle)": "EDITORS_PICK_TOP_RECTANGLE",
  "Editor's Pick - Middle (Rectangle)": "EDITORS_PICK_MIDDLE_RECTANGLE",
  "Editor's Pick - Bottom (Leaderboard)": "EDITORS_PICK_BOTTOM_LEADERBOARD",
  "Trending News - Top (Rectangle)": "TRENDING_NEWS_TOP_RECTANGLE",
  "Trending News - Middle (Rectangle)": "TRENDING_NEWS_MIDDLE_RECTANGLE",
  "Trending News - Bottom (Leaderboard)": "TRENDING_NEWS_BOTTOM_LEADERBOARD",
  "Politics - Top (Rectangle)": "POLITICS_TOP_RECTANGLE",
  "Politics - Middle (Rectangle)": "POLITICS_MIDDLE_RECTANGLE",
  "Politics - Bottom (Leaderboard)": "POLITICS_BOTTOM_LEADERBOARD",
  "News Category Page - Top (Rectangle)": "NEWS_CATEGORY_TOP_RECTANGLE",
  "News Category Page - Middle (Rectangle)": "NEWS_CATEGORY_MIDDLE_RECTANGLE",
  "News Category page - Bottom (Leaderboard)":
    "NEWS_CATEGORY_BOTTOM_LEADERBOARD",
  "News Detail Page - Top (Leaderboard)": "NEWS_DETAIL_TOP_LEADERBOARD",
  "News Detail Page - Middle (Rectangle)": "NEWS_DETAIL_MIDDLE_RECTANGLE",
  "News Detail Page - Bottom (Rectangle)": "NEWS_DETAIL_BOTTOM_RECTANGLE",
};

const CreateCustomAdModal = ({ visible, onClose, onCreate }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { adCreate, adCreateLoading, adCreateError } = useSelector(
    (state) => state.CREATE_ADS
  );
  const [adType, setAdType] = useState("");
  const [desktopImageUrl, setDesktopImageUrl] = useState(null);
  const [mobileImageUrl, setMobileImageUrl] = useState(null);
  const handleAdLocationChange = (value) => {
    if (value.includes("Leaderboard")) {
      setAdType("Leaderboard");
    } else if (value.includes("Rectangle")) {
      setAdType("Rectangle");
    } else {
      setAdType("");
    }
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const payload = {
        advertiserName: values.advertiserName,
        adLocation: adLocationEnumMap[values.adLocation],
        desktopImageUrl: desktopImageUrl,
        mobileImageUrl: mobileImageUrl,
        redirectUrl: values.redirectUrl,
        endDate: values.endDate.format("YYYY-MM-DD"),
      };

      console.log(payload);
      dispatch(createAds(payload));
    });
  };
  const handleChangeDesktop = async (info) => {
    const file = info.file?.originFileObj;
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await dispatch(uploadFile(formData));
      if (res?.status === "success") {
        setDesktopImageUrl(res?.url);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeMobile = async (info) => {
    const file = info.file?.originFileObj;
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await dispatch(uploadFile(formData));
      if (res?.status === "success") {
        setMobileImageUrl(res?.url);
      }
    } catch (error) {
      console.log("error=======>", error);
    }
  };

  useEffect(() => {
    if (adCreate) {
      dispatch(getAds());
      message.success({
        content: "Ad created successfully!",
        key: "adCreate",
        duration: 3,
      });
      form.resetFields();
      setDesktopImageUrl(null);
      setMobileImageUrl(null);
      onClose();
    }
  }, [adCreate]);

  useEffect(() => {
    if (adCreateError) {
      message.error({
        content: adCreateError,
        key: "adCreate",
        duration: 3,
      });
    }
  }, [adCreateError]);

  return (
    <Modal
      title="Create Custom Ad"
      open={visible}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      footer={null}
      centered
      width={600}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Advertiser Name:"
          name="advertiserName"
          rules={[{ required: true, message: "Please enter advertiser name" }]}
        >
          <Input placeholder="Enter advertiser name" />
        </Form.Item>

        <Form.Item
          label="Ad Location:"
          name="adLocation"
          rules={[{ required: true, message: "Please select ad location" }]}
        >
          <Select
            placeholder="Select Ad Location"
            onChange={handleAdLocationChange}
          >
            <Option value="Header (Leaderboard)">Header (Leaderboard)</Option>
            <Option value="Top Stories -Middle (Rectangle)">
              Top Stories -Middle (Rectangle)
            </Option>
            <Option value="Top Stories - Bottom (Leaderboard)">
              Top Stories - Bottom (Leaderboard)
            </Option>
            <Option value="Editor's Pick - Top (Rectangle)">
              Editor's Pick - Top (Rectangle)
            </Option>
            <Option value="Editor's Pick - Middle (Rectangle)">
              Editor's Pick - Middle (Rectangle)
            </Option>
            <Option value="Editor's Pick - Bottom (Leaderboard)">
              Editor's Pick - Bottom (Leaderboard)
            </Option>
            <Option value="Trending News - Top (Rectangle)">
              Trending News - Top (Rectangle)
            </Option>
            <Option value="Trending News - Middle (Rectangle)">
              Trending News - Middle (Rectangle)
            </Option>
            <Option value="Trending News - Bottom (Leaderboard)">
              Trending News - Bottom (Leaderboard)
            </Option>
            <Option value="Politics - Top (Rectangle)">
              Politics - Top (Rectangle)
            </Option>
            <Option value="Politics - Middle (Rectangle)">
              Politics - Middle (Rectangle)
            </Option>
            <Option value="Politics - Bottom (Leaderboard)">
              Politics - Bottom (Leaderboard)
            </Option>
            <Option value="News Category Page - Top (Rectangle)">
              News Category Page - Top (Rectangle)
            </Option>
            <Option value="News Category Page - Middle (Rectangle)">
              News Category Page - Middle (Rectangle)
            </Option>
            <Option value="News Category page - Bottom (Leaderboard)">
              News Category page - Bottom (Leaderboard)
            </Option>
            <Option value="News Detail Page - Top (Leaderboard)">
              News Detail Page - Top (Leaderboard)
            </Option>
            <Option value="News Detail Page - Middle (Rectangle)">
              News Detail Page - Middle (Rectangle)
            </Option>
            <Option value="News Detail Page - Bottom (Rectangle)">
              News Detail Page - Bottom (Rectangle)
            </Option>
          </Select>
        </Form.Item>

        {/* Leaderboard Image Upload */}
        {adType === "Leaderboard" && (
          <>
            <Form.Item
              label="Desktop View Ad (720px × 90px)"
              name="desktopImage"
            >
              <Upload
                maxCount={1}
                listType="text"
                accept=".jpg,.jpeg,.png"
                showUploadList={true}
                multiple={false}
                beforeUpload={() => true}
                customRequest={({ file, onSuccess }) => {
                  handleChangeDesktop({ file: { originFileObj: file } });
                  // dummy success callback to avoid warning
                  setTimeout(() => onSuccess("ok"), 0);
                }}
              >
                <Button icon={<UploadOutlined />}>Upload Desktop Image</Button>
              </Upload>
            </Form.Item>

            <Form.Item
              label="Mobile View Ad (320px × 100px)"
              name="mobileImage"
            >
              <Upload
                maxCount={1}
                listType="text"
                accept=".jpg,.jpeg,.png"
                showUploadList={true}
                multiple={false}
                beforeUpload={() => true}
                customRequest={({ file, onSuccess }) => {
                  handleChangeMobile({ file: { originFileObj: file } });
                  // dummy success callback to avoid warning
                  setTimeout(() => onSuccess("ok"), 0);
                }}
              >
                <Button icon={<UploadOutlined />}>Upload Mobile Image</Button>
              </Upload>
            </Form.Item>
          </>
        )}

        {/* Rectangle Image Upload */}
        {adType === "Rectangle" && (
          <>
            <Form.Item
              label="Desktop View Ad (450px × 280px)"
              name="desktopImage"
            >
              <Upload
                maxCount={1}
                listType="text"
                accept=".jpg,.jpeg,.png"
                showUploadList={true}
                multiple={false}
                beforeUpload={() => true}
                customRequest={({ file, onSuccess }) => {
                  handleChangeDesktop({ file: { originFileObj: file } });
                  // dummy success callback to avoid warning
                  setTimeout(() => onSuccess("ok"), 0);
                }}
              >
                <Button icon={<UploadOutlined />}>Upload Desktop Image</Button>
              </Upload>
            </Form.Item>

            <Form.Item
              label="New Field Mobile View Ad (300px × 250px)"
              name="mobileImage"
            >
              <Upload
                maxCount={1}
                listType="text"
                accept=".jpg,.jpeg,.png"
                showUploadList={true}
                multiple={false}
                beforeUpload={() => true}
                customRequest={({ file, onSuccess }) => {
                  handleChangeMobile({ file: { originFileObj: file } });
                  // dummy success callback to avoid warning
                  setTimeout(() => onSuccess("ok"), 0);
                }}
              >
                <Button icon={<UploadOutlined />}>Upload Mobile Image</Button>
              </Upload>
            </Form.Item>
          </>
        )}

        <Form.Item
          label={
            <span style={{ fontWeight: "bold" }}>
              Redirect URL (opens in a new tab) (external link)
            </span>
          }
          name="redirectUrl"
          rules={[{ required: true, message: "Please enter redirect URL" }]}
        >
          <Input placeholder="Enter external redirect URL" />
        </Form.Item>

        <Form.Item
          label="End Date:"
          name="endDate"
          rules={[{ required: true, message: "Please select end date" }]}
        >
          <DatePicker
            style={{ width: "100%" }}
            format="DD/MM/YYYY"
            disabledDate={(current) =>
              current && current < moment().startOf("day")
            }
          />
        </Form.Item>

        <Button type="primary" block onClick={handleSubmit}>
          Create Custom Ad
        </Button>
      </Form>
    </Modal>
  );
};

export default CreateCustomAdModal;
