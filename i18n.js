module.exports = {
  locales: ["en", "fr", "es", "ru", "ar", "zh", "hi", "sw"],
  defaultLocale: "en",
  pages: {
    "*": ["common"],
    "/": ["home"],
    "/content": ["content"],
  },
  // loadLocaleFrom: (locale, namespace) =>
  //   import(`./locales/${locale}/${namespace}`)
  //     .then((m) => m.default)
  //     .catch((err) => console.log(err)),

  loadLocaleFrom: async (lang, ns = "common") => {
    try {
      const c = await require(`./locales/${lang}/common.json`);
      const m = await require(`./locales/${lang}/${ns}.json`);

      return {
        ...(c || {}),
        ...(m || {}),
      };
    } catch (error) {
      console.log(123, error);
    }
  },
};
