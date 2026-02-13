import { DarkTheme as DarkThemeRN, DefaultTheme as DefaultThemeRN } from "@react-navigation/native";

export const LightTheme = {
    ...DefaultThemeRN,
    colors: {
        ...DefaultThemeRN.colors,
        primary: "#0dad4d",
        iconSize: "",
    },
};

export const DarkTheme = {
    ...DarkThemeRN,
    colors: {
        ...DarkThemeRN.colors,
        primary: "#0dad4d",
    },
};
