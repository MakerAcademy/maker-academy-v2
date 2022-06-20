import nookies from "nookies";
// gssp = data coming from the serversideprops

// Returns user if signed in
export function withUser(gssp, options = {}) {
  const { hideIfUserExists } = options;

  return async (context) => {
    const gsspData = gssp ? await gssp(context, "userData") : { props: {} };

    const { isLoggedIn, profile, user } = nookies.get(context);

    if (isLoggedIn == "true" && hideIfUserExists) {
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
        user: user ?? JSON.parse(user),
        profile: profile ?? JSON.parse(profile),
      },
    };
  };
}

// Protects user only if signed in and is granted permission
export function withProtectedUser(gssp, options = {}) {
  const { trustLevel } = options;

  return async (context) => {
    const gsspData = gssp ? await gssp(context, userData) : { props: {} };

    const { isLoggedIn, profile, user } = nookies.get(context);

    if (isLoggedIn !== "true") {
      return {
        redirect: {
          destination: "/login",
        },
      };
    }

    const { trustLevel: userTrustLevel } = JSON.parse(user);

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
        user: user ?? JSON.parse(user),
        profile: profile ?? JSON.parse(profile),
      },
    };
  };
}
