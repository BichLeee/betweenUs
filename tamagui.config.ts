import { config as baseConfig } from "@tamagui/config";
import { createTamagui } from "tamagui";

const config = createTamagui({
    ...baseConfig,
    themes: {
        ...baseConfig.themes,
        dark: {
            ...baseConfig.themes.dark,
            background: "transparent",
            backgroundHover: "#111",
            backgroundPress: "#222",
            backgroundFocus: "#333",
            backgroundStrong: "#444",
            color: "#fff",
            colorHover: "#eee",
            colorPress: "#ddd",
            colorFocus: "#ccc",
            borderColor: "#555",
            borderColorHover: "#666",
            borderColorFocus: "#777",
            borderColorPress: "#888",
            placeholderColor: "#999",
        },
        light: {
            ...baseConfig.themes.light,
            background: "#fff",
            backgroundHover: "#f5f5f5",
            backgroundPress: "#e0e0e0",
            backgroundFocus: "#d5d5d5",
            backgroundStrong: "#ccc",
            color: "#000",
            colorHover: "#111",
            colorPress: "#222",
            colorFocus: "#333",
            borderColor: "#444",
            borderColorHover: "#555",
            borderColorFocus: "#666",
            borderColorPress: "#777",
            placeholderColor: "#888",
        },
    },
});

export default config;
