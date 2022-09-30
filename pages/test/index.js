import { getStorageDownloadUrl } from "@lib/storage";
import React from "react";

const Test = () => {
  const handleClick = async () => {
    getStorageDownloadUrl("/app/content-thumbnail.png").then((res) => {
      console.log(res);
    });
  };

  return (
    <div>
      <button onClick={handleClick}>Click</button>
    </div>
  );
};

export default Test;
