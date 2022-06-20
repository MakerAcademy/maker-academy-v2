import { handleSignOut } from "@utils/firebase";
import React, { useEffect } from "react";

const Signout = () => {
  useEffect(() => {
    handleSignOut();
  }, []);

  return <></>;
};

export default Signout;
