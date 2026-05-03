import { Tabs } from "expo-router";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { useTheme, View, XStack } from "tamagui";

import { IconSymbol } from "@/components/ui/icon-symbol";
import { ModalCreateSpace } from "./_components/ModalCreateSpace";

const CustomTabBar = ({ state, navigation }: any) => {
    const theme = useTheme();

    const [modalCreate, setModalCreate] = useState(false);

    const tabList = [
        { icon: "house", onPress: () => navigation.navigate(state.routeNames[0]) },
        { icon: "plus", onPress: () => setModalCreate(true) },
        { icon: "person", onPress: () => navigation.navigate(state.routeNames[1]) },
    ];

    return (
        <View style={styles.wrapper}>
            <XStack style={styles.container} alignItems="center" justifyContent="space-between">
                {tabList.map((tab, index) => {
                    const isFocused = state.index === index;

                    return (
                        <View
                            key={index}
                            style={[styles.tabItem, isFocused && { backgroundColor: theme.primary.val }]}
                            onPress={tab.onPress}
                        >
                            <IconSymbol name={tab.icon as any} size={24} color={isFocused ? "#000" : "#aaa"} />
                        </View>
                    );
                })}
            </XStack>
            <ModalCreateSpace open={modalCreate} setOpen={setModalCreate} />
        </View>
    );
};

export default function TabLayout() {
    return (
        <>
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: { display: "none" },
                }}
                tabBar={(props) => <CustomTabBar {...props} />}
            >
                <Tabs.Screen name="index" options={{ title: "Home", sceneStyle: { backgroundColor: "transparent" } }} />
                <Tabs.Screen
                    name="explore"
                    options={{ title: "Profile", sceneStyle: { backgroundColor: "transparent" } }}
                />
            </Tabs>
        </>
    );
}

const styles = StyleSheet.create({
    // container: {
    //     height: 60,
    //     borderWidth: 1,
    //     borderRadius: 100,
    //     alignSelf: "center",
    //     backgroundColor: "rgba(255, 255, 255, 0.05)",
    //     borderColor: "rgba(255,255,255,0.08)",
    //     shadowColor: "#fff",
    //     shadowOffset: { width: 0, height: 20 },
    //     shadowOpacity: 0.25,
    //     shadowRadius: 30,
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     position: "absolute",
    //     bottom: 20,
    //     zIndex: 10,
    // },

    wrapper: {
        position: "absolute",
        bottom: 30,
        left: 0,
        right: 0,
        alignItems: "center",
    },

    container: {
        flexDirection: "row",
        height: 60,
        borderRadius: 30,
        padding: 12,
        gap: 16,

        // glass effect
        backgroundColor: "rgba(255,255,255,0.08)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.1)",

        // iOS shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 20,

        // Android
        elevation: 10,
    },

    tabItem: {
        borderRadius: 100,
        padding: 10,
    },
});
