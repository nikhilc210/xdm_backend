import { createSlice } from "@reduxjs/toolkit";
import {
  createAdState,
  createAdminState,
  getAdminState,
  updateAdminState,
} from "../../state";

const getAdminSlice = createSlice({
  name: "GET_ADMIN_SLICE",
  initialState: getAdminState,
  reducers: {
    getAdminStart: (state) => {
      state.getAdminLoading = true;
      state.getAdminError = null;
    },
    getAdminSuccess: (state, action) => {
      state.getAdminLoading = false;
      state.admins = action.payload;
    },
    getAdminError: (state, action) => {
      state.getAdminLoading = false;
      state.getAdminError = action.payload;
    },
  },
});

const createAdminSlice = createSlice({
  name: "CREATE_ADMIN_SLICE",
  initialState: createAdminState,
  reducers: {
    createAdminStart: (state) => {
      state.createAdminLoading = true;
      state.createAdminError = null;
    },
    createAdminSuccess: (state, action) => {
      state.createAdminLoading = false;
      state.createAdmin = action.payload;
    },
    createAdminError: (state, action) => {
      state.createAdminLoading = false;
      state.createAdminError = action.payload;
    },
  },
});

const updateAdminSlice = createSlice({
  name: "UPDATE_ADMIN_SLICE",
  initialState: updateAdminState,
  reducers: {
    updateAdminStart: (state) => {
      state.updateAdminLoading = true;
      state.updateAdminError = null;
    },
    updateAdminSuccess: (state, action) => {
      state.updateAdminLoading = false;
      state.updateAdmin = action.payload;
    },
    updateAdminError: (state, action) => {
      state.updateAdminLoading = false;
      state.updateAdminError = action.payload;
    },
  },
});

export const { getAdminStart, getAdminSuccess, getAdminError } =
  getAdminSlice.actions;
export const { createAdminStart, createAdminSuccess, createAdminError } =
  createAdminSlice.actions;
export const { updateAdminStart, updateAdminSuccess, updateAdminError } =
  updateAdminSlice.actions;

export const getAdminReducer = getAdminSlice.reducer;
export const createAdminReducer = createAdminSlice.reducer;
export const updateAdminReducer = updateAdminSlice.reducer;
