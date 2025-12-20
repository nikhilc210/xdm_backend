import React, { useState, useEffect } from "react";
import { Button, Typography, Card, Input } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useDispatch, useSelector } from "react-redux";
import { getContents, updateContents } from "../../../redux/action/Content";
import TextArea from "antd/es/input/TextArea";
const { Title } = Typography;

const Spotify = () => {
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
      spotify: careerContent,
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
    if (content?.data?.spotify) {
      setCareerContent(content.data.spotify);
    }
  }, [content]);

  useEffect(() => {
    if (updateContent) {
      alert("Spotify updated successfully");
    }
    if (updateContentError) {
      alert("Something went wrong please try again");
    }
  }, [updateContent, updateContentError]);

  console.log("content====>", content);

  return (
    <div style={{ padding: "20px" }}>
      <Title level={3}>Spotify Playlist</Title>

      <Card style={{ marginTop: 16 }}>
        <TextArea
          value={careerContent}
          onChange={(e) => {
            setCareerContent(e.target.value);
          }}
          rows={10}
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

export default Spotify;
