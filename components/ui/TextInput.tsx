import { styled } from "@tamagui/core";
import { Input as InputTM } from "tamagui";

export const TextInput = styled(InputTM, {
    borderWidth: 1,
    borderStyle: "solid",
    color: "$color",
    backgroundColor: "$background",
    placeholderTextColor: "$placeholderColor",
    variants: {
        variant: {
            primary: {
                fontSize: 14,
                lineHeight: 18,
                backgroundColor: "rgba(0,0,0,0.2)",
                borderRadius: 50,
                textAlign: "center",
            },
            default: {},
        },
    } as const,
});
