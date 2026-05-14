import { styled } from "@tamagui/core";
import { Button as ButtonTM } from "tamagui";

export const Button = styled(ButtonTM, {
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "$borderColor",
    backgroundColor: "$backgroundStrong",
    variants: {
        variant: {
            primary: {
                borderStyle: "solid",
                borderRadius: 100,
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(20px) saturate(180%)",
                borderColor: "rgba(255, 255, 255, 0.3)",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.2,
                shadowRadius: 15,
                // borderColor: theme.colors.primary,
            },
            text: {
                backgroundColor: "#000",
                borderWidth: 0,
                chromeless: true,
            },
            icon: {
                flexDirection: "row",
                alignItems: "center",
                // width: 60,
                // height: 60,
                borderRadius: 100,
            },
            default1: {
                backgroundColor: "#fff",
                color: "#000",
            },
            default2: {
                backgroundColor: "#e0e0e0",
            },
        },
        rounded: {
            true: {
                borderRadius: 100,
            },
        },
    } as const,
});
