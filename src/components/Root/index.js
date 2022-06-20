import { auth } from "@firebase";
import { useAppDispatch, useAppSelector } from "@hooks/useRedux";
import { setProfile } from "@redux/slices/profileSlice";
import { setUser } from "@redux/slices/userSlice";
import { getContact, getUser } from "@utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import nookies from "nookies";
import { useEffect } from "react";

const Root = ({ children }) => {
  const { user } = useAppSelector((state) => state.user);
  const { profile } = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();
  let unsubscribeAuth;

  const watchAuth = () => {
    unsubscribeAuth = onAuthStateChanged(auth, async (_user) => {
      if (!_user) {
        dispatch(setUser(null));
        dispatch(setProfile(null));
        console.log("Not Logged In");
        nookies.destroy(null, "token");
        nookies.destroy(null, "user");
        nookies.destroy(null, "profile");
        nookies.destroy(null, "isLoggedIn");

        nookies.set(null, "token", "", { path: "/" });
        nookies.set(null, "user", "", { path: "/" });
        nookies.set(null, "profile", "", { path: "/" });
        nookies.set(null, "isLoggedIn", "", { path: "/" });
        return;
      }
      const { email, displayName, emailVerified } = _user;

      dispatch(
        setUser({
          ...user,
          email,
          displayName,
          emailVerified,
          trustLevel: user?.trustLevel || 1,
        })
      );

      const token = await _user.getIdToken();

      const userProfile = await getContact(_user.uid);
      dispatch(setProfile(userProfile));

      const userData = await getUser(_user.uid);
      dispatch(
        setUser({
          ...user,
          trustLevel: userData?.trustLevel || user.trustLevel,
        })
      );

      console.log("Logged In");
      nookies.destroy(null, "token");
      nookies.destroy(null, "user");
      nookies.destroy(null, "profile");
      nookies.destroy(null, "isLoggedIn");

      nookies.set(null, "token", token, { path: "/" });
      nookies.set(
        null,
        "user",
        JSON.stringify({
          ...user,
          trustLevel: userData?.trustLevel || user.trustLevel,
        }),
        { path: "/" }
      );
      nookies.set(null, "profile", JSON.stringify(userProfile), { path: "/" });
      nookies.set(null, "isLoggedIn", true, { path: "/" });
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.nookies = nookies;
    }
    watchAuth();

    return unsubscribeAuth;
  }, [unsubscribeAuth]);

  return <>{children}</>;
};

export default Root;
