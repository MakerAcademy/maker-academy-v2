import { handleSignOut } from "@lib/auth";
import React, { useEffect } from "react";

const logout = () => {
  useEffect(() => {
    handleSignOut();
  }, []);

  return <></>;
};

export default logout;
