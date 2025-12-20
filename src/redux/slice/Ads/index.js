import { createSlice } from "@reduxjs/toolkit";
import { addState, createAdState, deleteAdState } from "../../state";

const getAdsSlice = createSlice({
  name: "GET_ADS_LIST_SLICE",
  initialState: addState,
  reducers: {
    startAds: (state) => {
      state.loadingAds = true;
      state.errorAds = null;
    },
    successAds: (state, action) => {
      state.loadingAds = false;
      state.ads = action.payload;
    },
    errorAds: (state, action) => {
      state.loadingAds = false;
      state.errorAds = action.payload;
    },
  },
});

const createAdsSlice = createSlice({
  name: "CREATE_ADS_SLICE",
  initialState: createAdState,
  reducers: {
    createStartAds: (state) => {
      state.adCreateLoading = true;
      state.adCreateError = null;
    },
    createSuccessAds: (state, action) => {
      state.adCreateLoading = false;
      state.adCreate = action.payload;
    },
    createErrorAds: (state, action) => {
      state.adCreateLoading = false;
      state.adCreateError = action.payload;
    },
  },
});

const deleteAdsSlice = createSlice({
  name: "DELETE_ADS_SLICE",
  initialState: deleteAdState,
  reducers: {
    deleteStartAds: (state) => {
      state.adDeleteLoading = true;
      state.adDeleteError = null;
    },
    deleteSuccessAds: (state, action) => {
      state.adDeleteLoading = false;
      state.adDelete = action.payload;
    },
    deleteErrorAds: (state, action) => {
      state.adDeleteLoading = false;
      state.adDeleteError = action.payload;
    },
  },
});

export const { startAds, successAds, errorAds } = getAdsSlice.actions;
export const { createStartAds, createSuccessAds, createErrorAds } =
  createAdsSlice.actions;
export const { deleteStartAds, deleteSuccessAds, deleteErrorAds } =
  deleteAdsSlice.actions;

export const getAdsReducer = getAdsSlice.reducer;
export const createAdsCreducer = createAdsSlice.reducer;
export const deleteAdsReducer = deleteAdsSlice.reducer;
