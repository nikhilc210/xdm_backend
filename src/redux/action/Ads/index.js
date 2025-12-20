import api from "../../instance";
import {
  createErrorAds,
  createStartAds,
  createSuccessAds,
  deleteErrorAds,
  deleteStartAds,
  deleteSuccessAds,
  errorAds,
  startAds,
  successAds,
} from "../../slice/Ads";

const getAds = () => async (dispatch) => {
  dispatch(startAds());
  try {
    const res = await api.get(`ads/`);
    dispatch(successAds(res.data.data));
  } catch (err) {
    dispatch(errorAds(err?.response?.data?.message));
  }
};

const createAds = (payload) => async (dispatch) => {
  dispatch(createStartAds());
  try {
    const res = await api.post(`ads/`, payload);
    dispatch(createSuccessAds(res.data));
    console.log(res.data);
  } catch (err) {
    dispatch(createErrorAds(err?.response?.data?.message));
    console.log("error", err?.response?.data?.message);
  }
};

const deleteAds = (id) => async (dispatch) => {
  dispatch(deleteStartAds());
  try {
    const res = await api.delete(`ads/${id}`);
    dispatch(deleteSuccessAds(res.data));
    console.log(res.data);
  } catch (err) {
    dispatch(deleteErrorAds(err?.response?.data?.message));
    console.log("error", err?.response?.data?.message);
  }
};

export { getAds, createAds, deleteAds };
