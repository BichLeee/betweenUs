import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { useTheme, View, XStack, YStack } from "tamagui";

import { signIn } from "@/api/auth";
import { Button, Text, TextInput } from "@/components/ui";

type FormValues = {
    email: string;
    password: string;
};

export default function LoginScreen() {
    const { control, handleSubmit } = useForm();
    const theme = useTheme();

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
                <Button variant="text" onPress={() => router.replace("/signup")} size="$3">
                    Sign Up
                </Button>
            </XStack>
            <YStack
                alignItems="center"
                justifyContent="center"
                style={{
                    backdropFilter: "blur(25px)",
                    paddingBlock: 50,
                    paddingInline: 32,
                    borderRadius: 24,
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    borderWidth: 1,
                    // borderColor: "rgba(255,255,255,0.08)",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 20 },
                    shadowOpacity: 0.25,
                    shadowRadius: 30,
                }}
            >
                <Text variant="header1" textAlign="center" marginBlockEnd={10} letterSpacing={1.2}>
                    BetweenUs
                </Text>
                <Text fontSize={13} color="#aaa" marginBottom={60}>
                    Connect beyond the stars
                </Text>
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <TextInput
                            placeholder="Email"
                            autoCapitalize="none"
                            variant="primary"
                            height={44}
                            marginBlockEnd={20}
                            style={{ width: "100%" }}
                            {...field}
                        />
                    )}
                />
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <TextInput
                            placeholder="Password"
                            secureTextEntry
                            variant="primary"
                            height={44}
                            style={{ width: "100%" }}
                            {...field}
                        />
                    )}
                />
                <XStack width={280} justifyContent="flex-end">
                    <Text fontSize={12} color="#aaa" marginTop={20}>
                        Forgot password?
                    </Text>
                </XStack>
                <Button
                    marginBlockStart={40}
                    height={50}
                    borderRadius={100}
                    onPress={handleSubmit(onSubmit)}
                    style={{
                        backgroundColor: theme.primary.val,
                        shadowColor: theme.primary.val,
                        shadowOffset: { width: 0, height: 6 },
                        shadowOpacity: 0.6,
                        shadowRadius: 20,
                        width: "100%",
                    }}
                >
                    Sign in
                </Button>
            </YStack>
            <View>
                <Text textAlign="center" color="#b4b4b4">
                    Or sign in with
                </Text>
                <XStack gap={16} top={20} justifyContent="center">
                    <View style={styles.icon}>
                        <FontAwesome name="google" size={20} color="#fff" />
                    </View>
                    <View style={styles.icon}>
                        <FontAwesome name="apple" size={20} color="#fff" />
                    </View>
                </XStack>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    icon: {
        padding: 12,
        backgroundColor: "rgba(255,255,255,0.08)",
        borderRadius: 24,
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
    },
});
