import React from "react";
import MarkdownBox from "./MdBox";
import MdCode from "./MdCode";
import MdCollapse from "./MdCollapse";
import MdCtaBox from "./MdCtaBox";
import MdHero from "./MdHero";
import MdImage from "./MdImage";
import MdQuote from "./MdQuote";
import MdTooltip from "./MdTooltip";
import MdVideo from "./MdVideo";
import MdVoteResults from "./MdVoteResults";

const _parseArray = (str) => {
  if (!str) return str;

  try {
    if (str.startsWith("[") && str.endsWith("]")) {
      var arr = JSON.parse(str.replace(/'/g, '"'));
      return arr;
    }

    return str;
  } catch (err) {
    console.log(err);
    return str;
  }
};

const _parseBoolean = (str) => {
  if (!str) return str;

  if (str === "true") return true;
  if (str === "false") return false;

  return str;
};

const _mergeDots = (object) => {
  Object.keys(object)
    .filter((key) => key.indexOf(".") >= 0)
    .forEach((key) => {
      const combined = key.split(/\./);
      const parent = combined[0];
      const child = combined[1];
      if (!object[parent]) object[parent] = {}; // in case the key doesn't exist yet

      let _val = _parseArray(object[key]);
      _val = _parseBoolean(_val);

      object[parent][child] = _val; // assign the value.
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

      let _val = _parseArray(value);
      _val = _parseBoolean(_val);

      acc[key] = _val;
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
  cta_box: MdCtaBox,
  vote_results: MdVoteResults,
  code: MdCode,
  image: MdImage,
  video: MdVideo,
};

export default MarkdownComponent;
