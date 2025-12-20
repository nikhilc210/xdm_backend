import React, { useState, useEffect } from "react";
import { Button, Typography, Card } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useDispatch, useSelector } from "react-redux";
import { getContents, updateContents } from "../../../redux/action/Content";
const { Title } = Typography;

const CareerEditor = () => {
  const dispatch = useDispatch();
  const { content, contentLoading, contentError } = useSelector(
    (state) => state.GET_CONTENT
  );
  const { updateContent, updateContentLoading, updateContentError } =
    useSelector((state) => state.UPDATE_CONTENT);
  const [careerContent, setCareerContent] = useState("");

  const handleUpdate = () => {
    console.log("Updated Content:", careerContent);
    let payload = JSON.stringify({
      terms: careerContent,
    });
    dispatch(updateContents(payload));
    // dispatch API call or handle submission here
  };

  const getContentData = () => {
    dispatch(getContents());
  };

  useEffect(() => {
    getContentData();
  }, []);

  // when content is updated from redux, set it to state
  useEffect(() => {
    if (content?.data?.terms) {
      setCareerContent(content.data.terms);
    }
  }, [content]);

  useEffect(() => {
    if (updateContent) {
      alert("Terms updated successfully");
    }
    if (updateContentError) {
      alert("Something went wrong please try again");
    }
  }, [updateContent, updateContentError]);

  console.log("content====>", content);

  return (
    <div style={{ padding: "20px" }}>
      <Title level={3}>Terms and Condition</Title>

      <Card style={{ marginTop: 16 }}>
        <CKEditor
          editor={ClassicEditor}
          data={careerContent}
          config={{
            licenseKey:
              "eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3ODQxNTk5OTksImp0aSI6IjAyZjU4YjM0LTFmYTQtNGYzMi1iODU3LWZlZjQyYTU1ODEwYyIsImxpY2Vuc2VkSG9zdHMiOlsiYWRtaW4uY29ycGVybmV3cy5jb20iXSwidXNhZ2VFbmRwb2ludCI6Imh0dHBzOi8vcHJveHktZXZlbnQuY2tlZGl0b3IuY29tIiwiZGlzdHJpYnV0aW9uQ2hhbm5lbCI6WyJjbG91ZCIsImRydXBhbCJdLCJmZWF0dXJlcyI6WyJEUlVQIiwiRTJQIiwiRTJXIl0sInZjIjoiOWNmYTI0MWMifQ.S7q8AB4q9Y3REAtCtTraMLPrhZHtOlVLg4V399HP8zXsa-tYIwtKwI16baLnqtn4Ud6G0g_PS2oz92_OCq3I_g",
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setCareerContent(data);
          }}
        />
      </Card>

      <Button
        type="primary"
        style={{ marginTop: 20, width: "100%", backgroundColor: "#004d66" }}
        onClick={handleUpdate}
      >
        Update
      </Button>
    </div>
  );
};

export default CareerEditor;
