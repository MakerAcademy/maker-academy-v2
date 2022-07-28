import React from "react";
import MarkdownBox from "./MdBox";
import MdCollapse from "./MdCollapse";
import MdQuote from "./MdQuote";
import MdTooltip from "./MdTooltip";

const _mergeDots = (object) => {
  Object.keys(object)
    .filter((key) => key.indexOf(".") >= 0)
    .forEach((key) => {
      const combined = key.split(/\./);
      const parent = combined[0];
      const child = combined[1];
      if (!object[parent]) object[parent] = {}; // in case the key doesn't exist yet

      object[parent][child] = object[key]; // assign the value.
      delete object[key]; // remove the ugly key
    });

  return object;
};

export const parseMdCode = (_str) => {
  const result = _str.split("\n").reduce((acc, item) => {
    if (item.includes(":")) {
      const [key, ...rest] = item.split(":");
      const value = rest.join("_").trim();

      acc[key] = value;
    }

    return acc;
  }, {});
  const res = _mergeDots(result);

  return res;
};

const MarkdownComponent = ({ value, ...other }) => {
  const type = parseMdCode(value.split("\n")[0])?.component;

  const RenderedComponent = MarkdownComponent.type[type];

  if (RenderedComponent) {
    return <RenderedComponent value={value} {...other} />;
  }

  return <></>;
};

MarkdownComponent.type = {
  card: MarkdownBox,
  tooltip: MdTooltip,
  collapse: MdCollapse,
  quote: MdQuote,
};

export default MarkdownComponent;
