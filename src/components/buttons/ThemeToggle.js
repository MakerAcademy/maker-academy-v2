import { changeTheme, activeTheme } from "@redux/slices/themeSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const ThemeToggle = () => {
  const theme = useSelector(activeTheme);
  const dispatch = useDispatch();

  return <button onClick={() => dispatch(changeTheme())}>ThemeToggle</button>;
};

export default ThemeToggle;
