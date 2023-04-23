export const tokens = {
  grey: {
    0: "#ffffff",
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#eeeeee",
    300: "#e0e0e0",
    500: "#9e9e9e",
    600: "#757575",
    700: "#616161",
    900: "#212121",
    1000: "#000000",
  },
  primary: {
    // blue
    50: "#e3f2fd",
    200: "#90caf9",
    500: "#2196f3",
    600: "#1e88e5",
    800: "#1565c0",
  },
  secondary: {
    // purple
    50: "#ede7f6",
    200: "#b39ddb",
    500: "#673ab7",
    600: "#5e35b1",
    800: "#4527a0",
  },
  success: {
    // green
    100: "#b9f6ca",
    200: "#69f0ae",
    400: "#69f0ae",
    700: "#00c853",
  },
  error: {
    // red
    50: "#ef9a9a",
    200: "#f44336",
    800: "#c62828",
  },
  warning: {
    // yellow
    50: "#fff2bd",
    100: "#ffe373",
    500: "#ffc107",
  },
};

export const themeSettings = (mode) => {
  return {
    palette: {
      primary: {
        ...tokens.primary,
        main: tokens.primary[500],
        light: tokens.primary[50],
      },
      secondary: {
        ...tokens.secondary,
        main: tokens.secondary[500],
        light: tokens.secondary[50],
      },
      success: {
        ...tokens.success,
        main: tokens.success[400],
        light: tokens.success[100],
      },
      error: {
        ...tokens.error,
        main: tokens.error[200],
        light: tokens.error[50],
      },
      warning: {
        ...tokens.warning,
        main: tokens.warning[500],
        light: tokens.warning[100],
      },
      neutral: {
        ...tokens.grey,
        main: tokens.grey[500],
      },
      background: {
        default: tokens.grey[0],
        alt: tokens.grey[50],
      },
    },
    typography: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
