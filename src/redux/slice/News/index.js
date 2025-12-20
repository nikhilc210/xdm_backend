import { createSlice } from "@reduxjs/toolkit";
import {
  createNewsState,
  deleteNewsState,
  newsListState,
  updateNewsState,
} from "../../state";

const newsListSlice = createSlice({
  name: "NEWS_LIST_SLICE",
  initialState: newsListState,
  reducers: {
    startNews: (state) => {
      state.loadingNews = true;
      state.errorNews = null;
    },
    successNews: (state, action) => {
      state.loadingNews = false;
      state.news = action.payload;
    },
    errorNews: (state, action) => {
      state.loadingNews = false;
      state.errorNews = action.payload;
    },
  },
});

const createNewsSlice = createSlice({
  name: "CREATE_NEWS_SLICE",
  initialState: createNewsState,
  reducers: {
    startCreateNews: (state) => {
      state.createNewsLoading = true;
      state.createNewsError = null;
    },
    successCreateNews: (state, action) => {
      state.createNewsLoading = false;
      state.createNews = action.payload;
    },
    errorCreateNews: (state, action) => {
      state.createNewsLoading = false;
      state.createNewsError = action.payload;
    },
  },
});

const updateNewsSlice = createSlice({
  name: "UPDATE_NEWS_SLICE",
  initialState: updateNewsState,
  reducers: {
    startUpdateNews: (state) => {
      state.updateNewsLoading = true;
      state.updateNewsError = null;
    },
    successUpdateNews: (state, action) => {
      state.updateNewsLoading = false;
      state.updateNews = action.payload;
    },
    errorUpdateNews: (state, action) => {
      state.updateNewsLoading = false;
      state.updateNewsError = action.payload;
    },
  },
});

const deleteNewsSlice = createSlice({
  name: "DELETE_NEWS_SLICE",
  initialState: deleteNewsState,
  reducers: {
    startDeleteNews: (state) => {
      state.deleteNewsLoading = true;
      state.deleteNewsError = null;
    },
    successDeleteNews: (state, action) => {
      state.deleteNewsLoading = false;
      state.deleteNews = action.payload;
    },
    errorDeleteNews: (state, action) => {
      state.deleteNewsLoading = false;
      state.deleteNewsError = action.payload;
    },
  },
});

export const { startNews, successNews, errorNews } = newsListSlice.actions;
export const { startCreateNews, successCreateNews, errorCreateNews } =
  createNewsSlice.actions;
export const { startUpdateNews, successUpdateNews, errorUpdateNews } =
  updateNewsSlice.actions;
export const { startDeleteNews, successDeleteNews, errorDeleteNews } =
  deleteNewsSlice.actions;

export const getNewsReducer = newsListSlice.reducer;
export const createNewsReducer = createNewsSlice.reducer;
export const updateNewsReducer = updateNewsSlice.reducer;
export const deleteNewsReducer = deleteNewsSlice.reducer;
