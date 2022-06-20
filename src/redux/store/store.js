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
import themeSlice from "../slices/themeSlice";
import userSlice from "../slices/userSlice";
import profileSlice from "../slices/profileSlice";

const reducers = combineReducers({
  theme: themeSlice,
  user: userSlice,
  profile: profileSlice,
});

const persistConfig = { key: "root", storage };
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
