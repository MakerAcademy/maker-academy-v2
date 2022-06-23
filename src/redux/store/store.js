import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import themeSlice from "@redux/slices/themeSlice";
import userSlice from "@redux/slices/userSlice";
import profileSlice from "@redux/slices/profileSlice";
import globalSlice from "@redux/slices/globalSlice";
import contentSlice from "@redux/slices/contentSlice";

const reducers = combineReducers({
  theme: themeSlice,
  user: userSlice,
  profile: profileSlice,
  content: contentSlice,
  global: globalSlice,
});

const persistConfig = { key: "root", storage };
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
