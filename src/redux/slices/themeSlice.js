import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  active: "light",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setDarkMode: (state) => {
      state.active = "dark";
    },
    setLightMode: (state) => {
      state.active = "light";
    },
    changeTheme: (state) => {
      state.active === "light"
        ? (state.active = "dark")
        : (state.active = "light");
    },
  },
});

export const { setDarkMode, setLightMode, changeTheme } = themeSlice.actions;

export const activeTheme = (state) => {
  return state.theme.active;
};

export default themeSlice.reducer;
