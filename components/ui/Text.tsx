import { useTheme } from "@react-navigation/native";
import { ReactNode } from "react";
import { StyleSheet, TextProps as TextPropsRN, Text as TextRN, TextStyle } from "react-native";

const fontWeights = {
    light: 200,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    heavy: 800,
};

export type TextProps = TextPropsRN & {
    children: ReactNode;
    variant?: "label1" | "label2" | "body1" | "body2" | "body3" | "header1" | "header2" | "header3";
    color?: string;
    align?: TextStyle["textAlign"];
    transform?: TextStyle["textTransform"];
    truncate?: boolean;
    weight?: "light" | "regular" | "medium" | "semibold" | "bold" | "heavy";
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
};

export const Text = ({
    children,
    variant = "body1",
    weight,
    color,
    align,
    transform,
    truncate,
    style,
    top,
    bottom,
    left,
    right,
    ...props
}: TextProps) => {
    const theme = useTheme();

    let inlineStyles: any = { color: theme.colors.text };
    if (weight) inlineStyles = { ...inlineStyles, fontWeight: fontWeights[weight] };
    if (color) inlineStyles = { ...inlineStyles, color: color };
    if (transform) inlineStyles = { ...inlineStyles, textTransform: transform };
    if (align) inlineStyles = { ...inlineStyles, textAlign: align };
    if (top) inlineStyles = { ...inlineStyles, marginTop: top };
    if (bottom) inlineStyles = { ...inlineStyles, marginBottom: bottom };
    if (left) inlineStyles = { ...inlineStyles, marginLeft: left };
    if (right) inlineStyles = { ...inlineStyles, marginRight: right };
    if (truncate)
        inlineStyles = {
            ...inlineStyles,
            numberOfLines: 1,
            ellipsizeMode: "tail" as TextProps["ellipsizeMode"],
        };

    return (
        <TextRN style={[variantStyles[variant], inlineStyles, style]} {...props}>
            {children}
        </TextRN>
    );
};

const variantStyles = StyleSheet.create({
    header1: {
        fontSize: 36,
        fontWeight: "600",
        lineHeight: 42,
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
});
