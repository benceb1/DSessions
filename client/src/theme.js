const font = ["Rubik", "sans-serif"].join(",");
export const themeSettings = () => {
  return {
    typography: {
      fontFamily: font,
      fontSize: 12,
      h1: {
        fontFamily: font,
        fontSize: 40,
      },
      h2: {
        fontFamily: font,
        fontSize: 32,
      },
      h3: {
        fontFamily: font,
        fontSize: 24,
      },
      h4: {
        fontFamily: font,
        fontSize: 20,
      },
      h5: {
        fontFamily: font,
        fontSize: 16,
      },
      h6: {
        fontFamily: font,
        fontSize: 14,
      },
    },
  };
};
