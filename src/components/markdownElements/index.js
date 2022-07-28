import React from "react";
import MarkdownBox from "./MdBox";
import MdCollapse from "./MdCollapse";
import MdHero from "./MdHero";
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
  let _newStr = _str;

  // Replace all inline text
  const re = /\{{(.*?)\}}/gms;
  const matched = _str.match(re);
  if (matched) {
    _str.match(re).map((item) => {
      const abc = item
        ?.replaceAll("{{\n", "")
        ?.replaceAll("\n}}", "")
        ?.replaceAll("\n", "<<break>>");

      _newStr = _newStr.replaceAll(item, abc);
      return abc;
    });
  }

  // Parse to object
  const result = _newStr.split("\n").reduce((acc, item) => {
    if (item.includes(":")) {
      const [key, ...rest] = item.split(":");
      let value = rest.join(":").trim()?.replaceAll("<<break>>", "\n");

      acc[key] = value;
    }

    return acc;
  }, {});

  const res = _mergeDots(result);

  return res;
};

const MarkdownComponent = ({ value, ...other }) => {
  const data = parseMdCode(value);
  const type = data.component;

  const RenderedComponent = MarkdownComponent.type[type];

  if (RenderedComponent) {
    return <RenderedComponent data={data} {...other} />;
  }

  return <></>;
};

MarkdownComponent.type = {
  box: MarkdownBox,
  tooltip: MdTooltip,
  collapse: MdCollapse,
  quote: MdQuote,
  hero: MdHero,
};

export default MarkdownComponent;
