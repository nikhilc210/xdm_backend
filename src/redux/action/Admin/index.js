import api from "../../instance";
import {
  createAdminError,
  createAdminStart,
  createAdminSuccess,
  getAdminError,
  getAdminStart,
  getAdminSuccess,
  updateAdminError,
  updateAdminStart,
  updateAdminSuccess,
} from "../../slice/Admin";

const getAdmin = () => async (dispatch) => {
  dispatch(getAdminStart());
  try {
    const res = await api.get(`admins/`);
    console.log("data=======>", res.data.admins);
    dispatch(getAdminSuccess(res.data.admins));
  } catch (err) {
    dispatch(getAdminError(err?.response?.data?.message));
  }
};

const createAdminApi = (payload) => async (dispatch) => {
  dispatch(createAdminStart());
  try {
    const res = await api.post(`admins/`, payload);
    console.log("data=======>", res.data);
    dispatch(createAdminSuccess(res.data));
  } catch (err) {
    dispatch(createAdminError(err?.response?.data?.message));
    console.log(err?.response?.data?.message);
  }
};

const updateAdminApi = (payload, id) => async (dispatch) => {
  dispatch(updateAdminStart());
  try {
    const res = await api.put(`admins/${id}`, payload);
    console.log("data=======>", res.data);
    dispatch(updateAdminSuccess(res.data));
  } catch (err) {
    dispatch(updateAdminError(err?.response?.data?.message));
    console.log(err?.response?.data?.message);
  }
};

export { getAdmin, createAdminApi, updateAdminApi };
