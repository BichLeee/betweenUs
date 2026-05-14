import { styled } from "@tamagui/core";
import { SizableText } from "tamagui";

export const Text = styled(SizableText, {
    variants: {
        variant: {
            header1: {
                fontSize: 36,
                lineHeight: 42,
            },
            header2: {
                fontSize: 28,
                lineHeight: 34,
            },
            body1: {
                fontSize: 14,
                lineHeight: 18,
            },
            body2: {
                fontSize: 12,
                lineHeight: 16,
            },
            body3: {
                fontSize: 16,
                lineHeight: 20,
            },
            label1: {
                fontSize: 20,
                lineHeight: 24,
            },
            label2: {
                fontSize: 24,
                lineHeight: 28,
            },
            caption: {
                fontSize: 12,
                color: "#666",
            },
        },
    } as const,
});
