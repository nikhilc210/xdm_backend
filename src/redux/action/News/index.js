import api from "../../instance";
import {
  errorCreateNews,
  errorDeleteNews,
  errorNews,
  errorUpdateNews,
  startCreateNews,
  startDeleteNews,
  startNews,
  startUpdateNews,
  successCreateNews,
  successDeleteNews,
  successNews,
  successUpdateNews,
} from "../../slice/News";

const getNews = () => async (dispatch) => {
  dispatch(startNews());
  try {
    const res = await api.get(`news/`);
    dispatch(successNews(res.data));
  } catch (err) {
    dispatch(errorNews(err?.response?.data?.message));
  }
};

const createNewsApi = (payload) => async (dispatch) => {
  dispatch(startCreateNews());
  try {
    const res = await api.post(`news/publish`, payload);
    dispatch(successCreateNews(res.data));
  } catch (err) {
    dispatch(errorCreateNews(err?.response?.data?.message));
  }
};

const updateNewsApi = (payload, id) => async (dispatch) => {
  dispatch(startUpdateNews());
  try {
    const res = await api.put(`news/${id}`, payload);
    dispatch(successUpdateNews(res.data));
  } catch (err) {
    dispatch(errorUpdateNews(err?.response?.data?.message));
  }
};

const deleteNewsApi = (id) => async (dispatch) => {
  dispatch(startDeleteNews());
  try {
    const res = await api.delete(`news/${id}`);
    dispatch(successDeleteNews(res.data));
  } catch (err) {
    dispatch(errorDeleteNews(err?.response?.data?.message));
  }
};

export { getNews, createNewsApi, updateNewsApi, deleteNewsApi };
