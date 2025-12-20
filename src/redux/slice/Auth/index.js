import { createSlice } from "@reduxjs/toolkit";
import { loginState } from "../../state";

const loginUserSlice = createSlice({
  name: "LOGIN_USER_SLICE",
  initialState: loginState,
  reducers: {
    startLogin: (state) => {
      state.loading = true;
      state.error = null;
    },
    successLogin: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    errorLogin: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { startLogin, successLogin, errorLogin } = loginUserSlice.actions;
export const loginUserReducer = loginUserSlice.reducer;
