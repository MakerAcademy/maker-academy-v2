import nookies from "nookies";
// gssp = data coming from the serversideprops

// Returns user if signed in
export function withUser(gssp, options = {}) {
  const { hideIfUserExists } = options;

  return async (context) => {
    const { isLoggedIn, profile: _profile, user: _user } = nookies.get(context);

    const profile =
      _profile && _profile != "undefined"
        ? JSON?.parse?.(_profile || "")
        : null;
    const user =
      _user && _user != "undefined" ? JSON?.parse?.(_user || "") : null;

    if (isLoggedIn == "true" && hideIfUserExists) {
      return {
        redirect: {
          destination: "/",
        },
      };
    }

    const gsspData = gssp
      ? await gssp(context, { user, profile })
      : { props: {} };

    if (gsspData.redirect) {
      return gsspData;
    }

    return {
      props: {
        ...gsspData.props,
        user: user ? user : null,
        profile: profile ? profile : null,
      },
    };
  };
}

// Protects user only if signed in and is granted permission
export function withProtectedUser(gssp, options = {}) {
  const { trustLevel } = options;

  return async (context) => {
    const { isLoggedIn, profile: _profile, user: _user } = nookies.get(context);

    const profile =
      _profile && _profile != "undefined"
        ? JSON?.parse?.(_profile || "")
        : null;
    const user =
      _user && _user != "undefined" ? JSON?.parse?.(_user || "") : null;

    if (isLoggedIn !== "true") {
      return {
        redirect: {
          destination: "/login",
        },
      };
    }

    const gsspData = gssp
      ? await gssp(context, { user, profile })
      : { props: {} };

    const { trustLevel: userTrustLevel } = user;

    if (!!trustLevel && userTrustLevel < trustLevel) {
      return {
        redirect: {
          destination: "/",
        },
      };
    }

    if (gsspData.redirect) {
      return gsspData;
    }

    return {
      props: {
        ...gsspData.props,
        user: user ? user : null,
        profile: profile ? profile : null,
      },
    };
  };
}
