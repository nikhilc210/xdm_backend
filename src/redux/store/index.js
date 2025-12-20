import { configureStore } from "@reduxjs/toolkit";
import { loginUserReducer } from "../slice/Auth";
import {
  createNewsReducer,
  deleteNewsReducer,
  getNewsReducer,
  updateNewsReducer,
} from "../slice/News";
import {
  createAdsCreducer,
  deleteAdsReducer,
  getAdsReducer,
} from "../slice/Ads";
import {
  getAdminReducer,
  createAdminReducer,
  updateAdminReducer,
} from "../slice/Admin";
import { getContentReducer, updateContentReducer } from "../slice/Content";
export const store = configureStore({
  reducer: {
    LOGIN: loginUserReducer,
    NEWS: getNewsReducer,
    GET_ADS: getAdsReducer,
    CREATE_ADS: createAdsCreducer,
    DELETE_ADS: deleteAdsReducer,
    GET_ADMIN: getAdminReducer,
    CREATE_ADMIN: createAdminReducer,
    UPDATE_ADMIN: updateAdminReducer,
    GET_CONTENT: getContentReducer,
    UPDATE_CONTENT: updateContentReducer,
    CREATE_NEWS: createNewsReducer,
    UPDATE_NEWS: updateNewsReducer,
    DELETE_NEWS: deleteNewsReducer,
  },
});
