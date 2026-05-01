import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { signIn } from "@/api/auth";
import { Button, GlowButton, Text, TextInput } from "@/components/ui";
import { StyleSheet } from "react-native";
import { View, XStack } from "tamagui";

type FormValues = {
    email: string;
    password: string;
};

export default function LoginScreen() {
    const { control, handleSubmit } = useForm();

    const router = useRouter();
    const dispatch = useDispatch();

    const onSubmit: SubmitHandler<FormValues> = async ({ email, password }) => {
        const { status, data } = await signIn(email, password);
        if (status === 200) {
            dispatch({ type: "user/setUser", payload: data });
        }
    };

    return (
        <View
            style={{
                paddingInline: 20,
                display: "flex",
                justifyContent: "space-between",
                height: "100%",
                paddingBottom: 60,
                backgroundSize: "cover",
            }}
        >
            <XStack justifyContent="flex-end">
                <Button
                    variant="text"
                    onPress={() => router.replace("/signup")}
                    size="$3"
                    // icon={<FontAwesome name="user-circle" size={24} color="#fff" />}
                    // icon={<IconSymbol name="person.circle" color="#fff" size={30} />}
                >
                    Sign Up
                </Button>
            </XStack>
            <Text variant="header1" textAlign="center">
                BetweenUs
            </Text>
            <View>
                <TextInput
                    placeholder="Email"
                    autoCapitalize="none"
                    name="email"
                    control={control}
                    variant="primary"
                    height={50}
                />
                <TextInput
                    placeholder="Password"
                    secureTextEntry
                    name="password"
                    control={control}
                    variant="primary"
                    style={{ marginTop: 24 }}
                    height={50}
                    mb={40}
                />
                <GlowButton onPress={handleSubmit(onSubmit)}>Sign in</GlowButton>
            </View>
            <View>
                <Text textAlign="center" color="#b4b4b4">
                    Or sign in with
                </Text>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        gap: 12,
                        marginTop: 20,
                    }}
                >
                    <FontAwesome name="google" size={24} color="#fff" style={styles.icon} />
                    <FontAwesome name="apple" size={24} color="#fff" style={styles.icon} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    icon: {
        padding: 12,
        backgroundColor: "#3d3d3d",
        borderRadius: 24,
        width: 48,
        height: 48,
        textAlign: "center",
    },
});
