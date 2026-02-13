import { Theme, useTheme } from "@react-navigation/native";
import { ReactNode, useMemo } from "react";
import { Pressable, PressableProps, StyleSheet, View } from "react-native";
import { Text } from "./Text";

type ButtonProps = PressableProps & {
    children?: ReactNode;
    variant?: "default1" | "default2" | "primary" | "icon" | "text";
    icon?: ReactNode;
    iconPosition?: "left" | "right";
    size?: "small" | "medium" | "large";
};

export const Button = ({
    children,
    variant = "default1",
    icon = null,
    iconPosition = "left",
    disabled,
    size = "medium",
    style,
    ...props
}: ButtonProps) => {
    const theme = useTheme();
    const styles = useMemo(() => createStyles(theme), [theme]);

    return (
        <Pressable
            {...props}
            disabled={disabled}
            style={({ pressed }) => [
                styles.base,
                styles[size + "Button"],
                styles[variant],
                style,
                pressed && styles.pressed,
                disabled && styles.disabled,
            ]}
        >
            <View style={styles.textWrapper}>
                {iconPosition === "left" && icon}
                <Text style={[styles[size + "ButtonText"]]}>{children}</Text>
                {iconPosition === "right" && icon}
            </View>
        </Pressable>
    );
};

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        base: {
            borderRadius: 8,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: theme.colors.border,
            padding: 16,
        },
        textWrapper: {
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "row",
            gap: 12,
            color: theme.colors.text,
            width: "100%",
        },
        smallButton: {
            padding: 12,
        },
        mediumButton: {
            padding: 16,
        },
        largeButton: {
            padding: 16,
        },
        smallButtonText: {
            fontSize: 18,
            lineHeight: 24,
        },
        mediumButtonText: {
            fontSize: 20,
            lineHeight: 26,
        },
        largeButtonText: {
            fontSize: 24,
            lineHeight: 30,
        },
        primary: {
            borderStyle: "solid",
            borderRadius: 100,
            borderColor: theme.colors.primary,
        },
        text: {
            backgroundColor: "transparent",
            borderWidth: 0,
        },
        icon: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#afafaf",
            width: 60,
            height: 60,
            borderRadius: 100,
        },
        default1: {
            backgroundColor: "#f0f0f0",
        },
        default2: {
            backgroundColor: "#e0e0e0",
        },
        pressed: {
            opacity: 0.7,
        },
        disabled: {
            opacity: 0.5,
        },

        body1: {
            fontWeight: "400",
            lineHeight: 20,
        },
        label: {
            fontWeight: "500",
        },
    });
