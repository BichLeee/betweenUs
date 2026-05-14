import { LinearGradient } from "@tamagui/linear-gradient";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import { Image, View, XStack, YStack } from "tamagui";

import { Text } from "@/components/ui";
import { IconSymbol } from "@/components/ui/icon-symbol";

export const Space = ({ space }: { space: any }) => {
    const router = useRouter();

    return (
        <View key={space.id} style={styles.wrapper} onPress={() => router.push(`/space/${space.id}`)}>
            <Image src="https://picsum.photos/800/600" style={styles.image} key={space.id} />
            <LinearGradient
                start={[0, 0]}
                end={[0, 1]}
                colors={["transparent", "rgba(0,0,0,0.5)", "rgba(0,0,0,0.7)"]}
                style={styles.name}
                height={80}
            >
                <YStack alignItems="center" width="100%">
                    <XStack alignItems="center" justifyContent="space-between" width="100%">
                        <Text fontWeight="bold" fontSize={20}>
                            {space.name}
                        </Text>
                        <XStack borderColor="$borderColor" style={styles.members} alignItems="center" gap={8}>
                            <IconSymbol name="person.2" size={20} color="#fff" />
                            <Text color="#fff">{space.members || 0}</Text>
                        </XStack>
                    </XStack>
                    <Text color="#fff">Space description</Text>
                    <Text color="$description" fontSize={12}>
                        Last updated: {space.lastUpdated ? new Date(space.lastUpdated).toLocaleDateString() : "N/A"}
                    </Text>
                </YStack>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        position: "relative",
        // boxShadow: "inset 0 10px 10px 10px #000",
        borderRadius: 12,
    },
    image: {
        width: "100%",
        height: 150,
        filter: "brightness(0.6)",
        borderRadius: 12,
    },
    name: {
        position: "absolute",
        paddingInline: 20,
        bottom: 0,
        left: 0,
        width: "100%",
    },
    members: {
        borderWidth: 1,
        borderRadius: 100,
        paddingInline: 12,
        paddingBlock: 2,
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(80px)",
    },
});
