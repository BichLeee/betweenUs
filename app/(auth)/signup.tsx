import { signUp } from "@/api/auth";
import { Button, Text, TextInput } from "@/components/ui";
import { IconSymbol } from "@/components/ui/icon-symbol.ios";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Label, useTheme, XStack, YStack } from "tamagui";

type FormValues = {
    email: string;
    password: string;
    username: string;
    name: string;
    confirmPassword: string;
};

export default function LoginScreen() {
    const { control, handleSubmit } = useForm();

    const theme = useTheme();
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
            <Text variant="header1" textAlign="center">
                Create account
            </Text>
            <YStack alignItems="center" justifyContent="center">
                <Label htmlFor="username">Username</Label>
                <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                        <TextInput
                            accessibilityLabel="username"
                            placeholder="user1234"
                            autoCapitalize="none"
                            variant="primary"
                            style={{ width: "100%" }}
                        />
                    )}
                />
                <Label htmlFor="email">Email</Label>
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <TextInput
                            placeholder="abc@gmail.com"
                            autoCapitalize="none"
                            variant="primary"
                            style={{ width: "100%" }}
                            {...field}
                        />
                    )}
                />
                <Label htmlFor="password">Password</Label>
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <TextInput
                            placeholder="Your password"
                            secureTextEntry
                            variant="primary"
                            style={{ width: "100%" }}
                            {...field}
                        />
                    )}
                />
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field }) => (
                        <TextInput
                            placeholder="Confirm password"
                            secureTextEntry
                            variant="primary"
                            style={{ width: "100%" }}
                            {...field}
                        />
                    )}
                />
                <Button
                    variant="primary"
                    size="large"
                    onPress={handleSubmit(handleSignup)}
                    height={50}
                    style={{
                        backgroundColor: theme.primary.val,
                        shadowColor: theme.primary.val,
                        shadowOffset: { width: 0, height: 6 },
                        shadowOpacity: 0.6,
                        shadowRadius: 20,
                        marginTop: 80,
                        width: 250,
                    }}
                >
                    Sign up
                </Button>
            </YStack>
            <View>
                <Text textAlign="center" color="#b4b4b4">
                    Or register with
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
