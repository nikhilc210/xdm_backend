import axios from "axios";
import api from "../../instance";
import { errorUpload, startUpload, successUpload } from "../../slice/Files";

const uploadFile = (formData) => async (dispatch) => {
  dispatch(startUpload());
  try {
    const res = await axios.post(
      `https://api.corpernews.com/api/upload/upload-image`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(successUpload(res.data));
    return res.data;
  } catch (err) {
    dispatch(errorUpload(err?.response?.data?.message));
    return err?.response?.data?.message;
  }
};

export { uploadFile };
