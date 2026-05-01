import { styled } from "@tamagui/core";
import { SizableText } from "tamagui";

export const Text = styled(SizableText, {
    variants: {
        variant: {
            header1: {
                fontSize: 36,
                fontWeight: "600",
                lineHeight: 42,
            },
            header2: {
                fontSize: 28,
                fontWeight: "600",
                lineHeight: 34,
            },
            body1: {
                fontSize: 14,
                fontWeight: "400",
                lineHeight: 20,
            },
            label1: {
                fontSize: 20,
                fontWeight: "400",
                lineHeight: 24,
            },
            caption: {
                fontSize: 12,
                fontWeight: "400",
                color: "#666",
            },
        },
    } as const,
});
