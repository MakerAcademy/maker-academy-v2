import { changeTheme, activeTheme } from "@redux/slices/themeSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const ThemeSwitch = () => {
  const theme = useSelector(activeTheme);
  const dispatch = useDispatch();

  return <button onClick={() => dispatch(changeTheme())}>ThemeToggle</button>;
};

export default ThemeSwitch;
