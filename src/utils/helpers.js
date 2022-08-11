import { auth } from "@config/firebase";
import nookies from "nookies";

export const getUserFromCookies = async (context) => {
  const cookies = nookies.get(context);
  const token = await auth.verifyIdToken(cookies.token);
  return token;
};

export const cleanObject = (data) => {
  if (typeof data !== "object") {
    return data;
  }

  return Object.keys(data).reduce(function (accumulator, key) {
    const isObject = data[key] !== null && typeof data[key] === "object";
    let value = isObject ? cleanObject(data[key]) : data[key];
    const isEmptyObject = isObject && !Object.keys(value).length;
    if (value === undefined) {
      // || isEmptyObject
      return accumulator;
    }
    if (Array.isArray(data[key])) {
      value = Object.values(value);
    }

    return Object.assign(accumulator, { [key]: value });
  }, {});
};
