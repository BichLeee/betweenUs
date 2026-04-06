import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StatusBar, StyleSheet, View } from "react-native";
import "react-native-reanimated";
import "react-native-url-polyfill/auto";
import { Provider } from "react-redux";

import { initAuth } from "@/api/apiConfig";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useAuth } from "@/hooks/useAuth";
import store from "@/store/store";
import { DarkTheme } from "@/theme";
import { ThemeProvider } from "@react-navigation/native";

export const unstable_settings = {
    anchor: "(tabs)",
};

export default function RootLayout() {
    const router = useRouter();
    const segments = useSegments();
    const { session, loading } = useAuth();

    const colorScheme = useColorScheme();

    useEffect(() => {
        if (loading) return;

        const inAuthGroup = segments[0] === "(auth)";

        if (!session && !inAuthGroup) {
            router.replace("/login");
        }

        if (session && inAuthGroup) {
            router.replace("/");
        }
    }, [session, loading, segments]);

    useEffect(() => {
        initAuth();
    }, []);

    // return <Stack />;
    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center" }}>
                <ActivityIndicator />
            </View>
        );
    }

    return (
        <Provider store={store}>
            <ThemeProvider
                // value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
                value={DarkTheme}
            >
                <Stack
                    screenOptions={{
                        headerShown: false,
                        contentStyle: styles.container,
                    }}
                >
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                    <Stack.Screen name="modal" options={{ presentation: "modal", title: "Modal" }} />
                </Stack>
                <StatusBar />
            </ThemeProvider>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
    },
});
