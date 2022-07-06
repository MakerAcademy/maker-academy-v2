import { auth } from "@config/firebase";
import nookies from "nookies";
import _ from "lodash";

export const getUserFromCookies = async (context) => {
  const cookies = nookies.get(context);
  const token = await auth.verifyIdToken(cookies.token);
  return token;
};

export const cleanObject = (obj) => {
  return _(obj)
    .pickBy(_.isObject) // get only objects
    .mapValues(cleanObject) // call only for values as objects
    .assign(_.omitBy(obj, _.isObject)) // save back result that is not object
    .omitBy(_.isNil) // remove null and undefined from object
    .value(); // get value
};
