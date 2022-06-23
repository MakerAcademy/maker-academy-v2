import { handleSignOut } from "@lib/auth";
import React, { useEffect } from "react";

const Signout = () => {
  useEffect(() => {
    handleSignOut();
  }, []);

  return <></>;
};

export default Signout;
