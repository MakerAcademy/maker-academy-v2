import LoadingOverlay from "@components/LoadingOverlay";
import { createTheme } from "@config/theme";
import { auth } from "@config/firebase";
import { useAppDispatch, useAppSelector } from "@hooks/useRedux";
import LandingLayout from "@layouts/";
import DashboardLayout from "@layouts/Dashboard";
import {
  getContactFromUid,
  getUser,
  listenContactWithUid,
  updateContact,
  updateUser,
} from "@lib/user";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { setProfile, updateUserProfile } from "@redux/slices/contactSlice";
import { setUser } from "@redux/slices/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import Router, { useRouter } from "next/router";
import nookies from "nookies";
import { SnackbarProvider } from "notistack";
import React, { useEffect } from "react";
import { useDisconnect } from "wagmi";

const EmptyLayout = ({ children }) => (
  <React.Fragment>{children}</React.Fragment>
);

const Root = ({ children }) => {
  const { pathname } = useRouter();
  const { active } = useAppSelector((state) => state.theme);
  const theme = createTheme(active);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  let unsubscribeAuth;

  const { disconnect } = useDisconnect();

  const watchAuth = () => {
    unsubscribeAuth = onAuthStateChanged(auth, async (_user) => {
      if (!_user) {
        disconnect();
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

      const { email, displayName, emailVerified, uid } = _user;

      if (uid && !emailVerified && pathname !== "/verify_email") {
        // Router.push("/verify_email");
      }

      const userObj = {
        email,
        uid,
        displayName,
        emailVerified,
        trustLevel: user?.trustLevel || 1,
      };

      dispatch(setUser({ ...user, ...userObj }));

      const token = await _user.getIdToken();

      const userProfile = await getContactFromUid(_user?.uid);
      // dispatch(setProfile(userProfile));

      dispatch(updateUserProfile({ uid: _user?.uid }));

      const userData = await getUser(uid);
      dispatch(
        setUser({
          ...user,
          ...userObj,
          trustLevel: userData?.trustLevel || user?.trustLevel,
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
          ...userObj,
          trustLevel: userData?.trustLevel || user?.trustLevel,
        }),
        { path: "/" }
      );
      nookies.set(null, "profile", JSON.stringify(userProfile), { path: "/" });
      nookies.set(null, "isLoggedIn", true, { path: "/" });
    });
  };

  useEffect(() => {
    if (user) {
      const unsub = listenContactWithUid(user?.uid, (userProfile) => {
        dispatch(setProfile(userProfile));
        nookies.destroy(null, "profile");
        nookies.set(null, "profile", JSON.stringify(userProfile), {
          path: "/",
        });
      });

      return () => unsub();
    }
  }, [user]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.nookies = nookies;
    }
    watchAuth();

    return unsubscribeAuth;
  }, [unsubscribeAuth]);

  const Layout =
    pathname.startsWith("/login") || pathname.startsWith("/register")
      ? EmptyLayout
      : pathname.startsWith("/dashboard") || pathname.startsWith("/app")
      ? DashboardLayout
      : LandingLayout;

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <CssBaseline />
        <Layout>{children}</Layout>
      </SnackbarProvider>
      <LoadingOverlay />
    </ThemeProvider>
  );
};

export default Root;
