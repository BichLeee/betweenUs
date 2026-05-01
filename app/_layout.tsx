import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StatusBar, StyleSheet } from "react-native";
import "react-native-reanimated";
import "react-native-url-polyfill/auto";
import { Provider } from "react-redux";
import { TamaguiProvider, View } from "tamagui";

import { initAuth } from "@/api/apiConfig";
import { useAuth } from "@/hooks/useAuth";
import store from "@/store/store";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import config from "../tamagui.config";

export const unstable_settings = {
    anchor: "(tabs)",
};

export default function RootLayout() {
    const router = useRouter();
    const segments = useSegments();
    const { session, loading } = useAuth();

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

    return (
        <TamaguiProvider config={config} defaultTheme="dark">
            {loading ? (
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <ActivityIndicator />
                </View>
            ) : (
                <Provider store={store}>
                    <ThemeProvider
                        // value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
                        value={DefaultTheme}
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
                            <Stack.Screen name="space/[spaceId]" options={{ headerShown: false }} />
                        </Stack>
                        <StatusBar />
                    </ThemeProvider>
                </Provider>
            )}
        </TamaguiProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
    },
});
