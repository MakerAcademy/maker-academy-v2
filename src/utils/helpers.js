import { auth } from "@config/firebase";
import nookies from "nookies";

export const getUserFromCookies = async (context) => {
  const cookies = nookies.get(context);
  const token = await auth.verifyIdToken(cookies.token);
  return token;
};
