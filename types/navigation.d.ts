import "@react-navigation/native";

declare module "@react-navigation/native" {
    export interface Theme {
        colors: Theme["colors"] & {
            inputBG: string;
            buttonText: string;
            textMuted: string;
            surface: string;
        };
        fonts: Theme["fonts"];
    }
}
