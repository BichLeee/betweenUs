import { signUp } from "@/api/auth";
import { Button, ControlledTextInput, Text } from "@/components/ui";
import { IconSymbol } from "@/components/ui/icon-symbol.ios";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Octicons from "@expo/vector-icons/Octicons";
import { useRouter } from "expo-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";

type FormValues = {
    email: string;
    password: string;
    username: string;
    name: string;
    confirmPassword: string;
};

export default function LoginScreen() {
    const { control, handleSubmit } = useForm();

    const router = useRouter();

    const handleSignup: SubmitHandler<FormValues> = async (data) => {
        if (data.password === data.confirmPassword) {
            const res = await signUp(data.email, data.password, data.username, data.name);
            console.log(res);
            if (res.error) alert(res.error.message);
            else {
                router.replace("/login");
                alert("Account created, please login.");
            }
        } else {
            alert("Confirm password is incorrect !");
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
            <Button variant="icon" onPress={() => router.replace("/login")} style={styles.icon}>
                <IconSymbol name="chevron.left" color="#fff" size={24} />
            </Button>
            <Text variant="header1" align="center">
                Create account
            </Text>
            <View>
                <KeyboardAvoidingView>
                    <Text accessibilityLabel="Username" align="center" variant="label1" color="#878787" bottom={8}>
                        Username
                    </Text>
                    <ControlledTextInput
                        name="username"
                        placeholder="user1234"
                        autoCapitalize="none"
                        control={control}
                        variant="primary"
                    />
                    <Text
                        accessibilityLabel="Email"
                        align="center"
                        variant="label1"
                        color="#878787"
                        top={20}
                        bottom={8}
                    >
                        Email
                    </Text>
                    <ControlledTextInput
                        name="email"
                        control={control}
                        placeholder="abc@gmail.com"
                        autoCapitalize="none"
                        variant="primary"
                    />
                    <Text
                        accessibilityLabel="Password"
                        align="center"
                        variant="label1"
                        color="#878787"
                        top={20}
                        bottom={8}
                    >
                        Password
                    </Text>
                    <ControlledTextInput
                        name="password"
                        placeholder="Your password"
                        secureTextEntry
                        control={control}
                        variant="primary"
                    />
                    <Text
                        accessibilityLabel="Password"
                        align="center"
                        variant="label1"
                        color="#878787"
                        top={20}
                        bottom={8}
                    >
                        Confirm password
                    </Text>
                    <ControlledTextInput
                        name="confirmPassword"
                        control={control}
                        placeholder="Confirm password"
                        secureTextEntry
                        variant="primary"
                    />
                </KeyboardAvoidingView>
                <Button
                    variant="primary"
                    size="large"
                    onPress={handleSubmit(handleSignup)}
                    icon={<Octicons name="sign-in" size={24} color="#fff" />}
                    style={{ marginTop: 50 }}
                >
                    Sign up
                </Button>
            </View>
            <View>
                <Text align="center" color="#b4b4b4">
                    Or register with
                </Text>
                <View
                    style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: 12, marginTop: 20 }}
                >
                    <Button variant="icon" style={styles.icon}>
                        <FontAwesome name="google" size={24} color="#fff" style={styles.icon} />
                    </Button>
                    <Button variant="icon" style={styles.icon}>
                        <FontAwesome name="apple" size={24} color="#fff" style={styles.icon} />
                    </Button>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    icon: {
        width: 48,
        height: 48,
        padding: "auto",
        backgroundColor: "#3a3a3a",
    },
});
