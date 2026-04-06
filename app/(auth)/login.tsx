import FontAwesome from "@expo/vector-icons/FontAwesome";
import Octicons from "@expo/vector-icons/Octicons";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

import { signIn } from "@/api/auth";
import { Button, ControlledTextInput, Text } from "@/components/ui";
import { IconSymbol } from "@/components/ui/icon-symbol.ios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

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
                padding: 20,
                display: "flex",
                justifyContent: "space-between",
                height: "100%",
                paddingBottom: 60,
            }}
        >
            <View
                style={{
                    display: "flex",
                    alignItems: "flex-end",
                    padding: 10,
                }}
            >
                <Button
                    variant="text"
                    onPress={() => router.replace("/signup")}
                    // icon={<FontAwesome name="user-circle" size={24} color="#fff" />}
                    icon={<IconSymbol name="person.circle" color="#fff" size={30} />}
                >
                    Sign Up
                </Button>
            </View>
            <Text variant="header1" align="center">
                Sign in
            </Text>
            <View>
                <Text accessibilityLabel="Email" align="center" variant="label1" color="#878787" bottom={12}>
                    Email
                </Text>
                <ControlledTextInput
                    placeholder="Email"
                    autoCapitalize="none"
                    name="email"
                    control={control}
                    variant="primary"
                />
                <Text
                    accessibilityLabel="Password"
                    align="center"
                    variant="label1"
                    color="#878787"
                    top={40}
                    bottom={12}
                >
                    Password
                </Text>
                <ControlledTextInput
                    placeholder="Password"
                    secureTextEntry
                    name="password"
                    control={control}
                    variant="primary"
                />
                <Button
                    variant="primary"
                    size="large"
                    onPress={handleSubmit(onSubmit)}
                    icon={<Octicons name="sign-in" size={24} color="#fff" />}
                    style={{ marginTop: 50 }}
                >
                    Sign in
                </Button>
            </View>
            <View>
                <Text align="center" color="#b4b4b4">
                    Or sign in with
                </Text>
                <View
                    style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: 12, marginTop: 20 }}
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
