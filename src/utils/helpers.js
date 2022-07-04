import { auth } from "@config/firebase";
import nookies from "nookies";

export const getUserFromCookies = async (context) => {
  const cookies = nookies.get(context);
  const token = await auth.verifyIdToken(cookies.token);
  return token;
};

const CLEANER_VALUES = [null, undefined, ""];
export const cleanObject = (_object, _CLEANER_VALUES = CLEANER_VALUES) => {
  const cleanedObj = { ..._object };
  Object.keys(cleanedObj).forEach((key) => {
    if (_CLEANER_VALUES.includes(cleanedObj[key])) {
      delete cleanedObj[key];
    }
  });

  return cleanedObj;
};
