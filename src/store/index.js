import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import thunk from "redux-thunk";
import loadingReducer from "./loadingReducer";

import userReducer from "./userReducer";
import confirmReducer from "./confirmDeleteReducer";

const persistConfig = {
  key: "root",
  storage,
  transforms: [
    encryptTransform({
      secretKey: "WA29HXHSvL",
      onError: function (error) {
        // Handle the error.
      },
    }),
  ],
};

const reducers = combineReducers({
  user: userReducer,
  loading: loadingReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: {
    persist: persistedReducer,
    confirmDelete: confirmReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});
