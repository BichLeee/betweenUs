import { Theme, useTheme } from "@react-navigation/native";
import { useMemo } from "react";
import { Control, FieldValues, Path, RegisterOptions, useController } from "react-hook-form";
import { StyleSheet, TextInputProps, TextInput as TextInputRN, View } from "react-native";
import { Text } from "./Text";

type TextInputType = TextInputProps & {
    variant?: "primary" | "default";
    size?: "small" | "medium" | "large";
    error?: string;
};

export function TextInput({ variant = "default", size = "medium", error, style, ...props }: TextInputType) {
    const theme = useTheme();
    const styles = useMemo(() => createStyles(theme), [theme]);

    const sizeMap = {
        large: { padding: 20, fontSize: 24, lineHeight: 30 },
        medium: { padding: 16, fontSize: 20, lineHeight: 26 },
        small: { padding: 12, fontSize: 18, lineHeight: 24 },
    };

    return (
        <View>
            <TextInputRN
                placeholderTextColor="#fffff"
                style={[
                    styles.base,
                    { backgroundColor: theme.colors.text, borderColor: theme.colors.border },
                    styles[variant],
                    sizeMap[size],
                    {
                        borderColor: error ? "#ff6b6b" : theme.colors.border,
                    },
                    style,
                ]}
                {...props}
            />
            {error && (
                <Text align="center" color="#ff6b6b" style={styles.errorText}>
                    {error}
                </Text>
            )}
        </View>
    );
}

type ControlledTextInputType<T extends FieldValues> = Omit<TextInputType, "error"> & {
    control: Control<T>;
    name: Path<T>;
    rules?: RegisterOptions<T>;
};

export function ControlledTextInput<T extends FieldValues>({
    control,
    name,
    rules,
    ...props
}: ControlledTextInputType<T>) {
    const { field, fieldState } = useController({ control, name, rules });

    return (
        <TextInput
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            value={field.value}
            error={fieldState.error?.message}
            {...props}
        />
    );
}

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        base: {
            borderWidth: 1,
            borderStyle: "solid",
            color: theme.colors.text,
            backgroundColor: theme.colors.background,
        },
        primary: {
            fontSize: 20,
            lineHeight: 24,
            backgroundColor: "rgba(0,0,0,0.2)",
            borderRadius: 50,
            textAlign: "center",
            padding: 12,
        },
        default: {},
        errorText: {
            marginTop: 8,
            fontSize: 14,
        },
    });
