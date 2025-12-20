import api from "../../instance";
import {
  getErrorGetContent,
  getStartGetContent,
  getSuccessGetContent,
  updateErrorGetContent,
  updateStartGetContent,
  updateSuccessGetContent,
} from "../../slice/Content";

const getContents = () => async (dispatch) => {
  dispatch(getStartGetContent());
  try {
    const res = await api.get(`informative/`);
    dispatch(getSuccessGetContent(res.data));
  } catch (err) {
    dispatch(getErrorGetContent(err?.response?.data?.message));
  }
};

const updateContents = (payload) => async (dispatch) => {
  dispatch(updateStartGetContent());
  try {
    const res = await api.post(`informative/update`, payload);
    dispatch(updateSuccessGetContent(res.data));
  } catch (err) {
    dispatch(updateErrorGetContent(err?.response?.data?.message));
  }
};

export { getContents, updateContents };
