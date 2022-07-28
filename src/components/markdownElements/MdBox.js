import React, { useState } from "react";
import { parseMdCode } from ".";

const MarkdownBox = ({ value }) => {
  const [data, setData] = useState(parseMdCode(value));

  console.log("data", data);

  return <div>MarkdownBox</div>;
};

export default MarkdownBox;
