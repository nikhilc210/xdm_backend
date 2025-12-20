import { createSlice } from "@reduxjs/toolkit";
import { getContentState, updateContentState } from "../../state";

const getContentSlice = createSlice({
  name: "GET_CONTENTS",
  initialState: getContentState,
  reducers: {
    getStartGetContent: (state) => {
      state.contentLoading = true;
      state.contentError = null;
    },
    getSuccessGetContent: (state, action) => {
      state.contentLoading = false;
      state.content = action.payload;
    },
    getErrorGetContent: (state, action) => {
      state.contentLoading = false;
      state.contentError = action.payload;
    },
  },
});

const updateContentSlice = createSlice({
  name: "UPDATE_CONTENTS",
  initialState: updateContentState,
  reducers: {
    updateStartGetContent: (state) => {
      state.updateContentLoading = true;
      state.updateContentError = null;
    },
    updateSuccessGetContent: (state, action) => {
      state.updateContentLoading = false;
      state.updateContent = action.payload;
    },
    updateErrorGetContent: (state, action) => {
      state.updateContentLoading = false;
      state.updateContentError = action.payload;
    },
  },
});
export const { getStartGetContent, getSuccessGetContent, getErrorGetContent } =
  getContentSlice.actions;
export const {
  updateStartGetContent,
  updateSuccessGetContent,
  updateErrorGetContent,
} = updateContentSlice.actions;
export const getContentReducer = getContentSlice.reducer;
export const updateContentReducer = updateContentSlice.reducer;
