import { createSlice } from "@reduxjs/toolkit";
import { uploadImage } from "../../state";

const uploadFileSlice = createSlice({
  name: "UPLOAD_FILE_SLICE",
  initialState: uploadImage,
  reducers: {
    startUpload: (state) => {
      state.uploadLoading = true;
      state.uploadError = null;
    },
    successUpload: (state, action) => {
      state.uploadLoading = false;
      state.image = action.payload;
    },
    errorUpload: (state, action) => {
      state.uploadLoading = false;
      state.uploadError = action.payload;
    },
  },
});

export const { startUpload, successUpload, errorUpload } =
  uploadFileSlice.actions;
export const uploadFileReducer = uploadFileSlice.reducer;
