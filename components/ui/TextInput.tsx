import { styled } from "@tamagui/core";
import { Input as InputTM } from "tamagui";

export const TextInput = styled(InputTM, {
    color: "$color",
    backgroundColor: "$background",
    placeholderTextColor: "$placeholderColor",
    variants: {
        variant: {
            primary: {
                borderWidth: 0,
                fontSize: 14,
                lineHeight: 18,
                backgroundColor: "rgba(255,255,255,0.05)",
                borderRadius: 50,
                textAlign: "center",
                focusStyle: {
                    backgroundColor: "rgba(255,255,255,0.1)",
                },
            },
            default: {},
        },
    } as const,
});
