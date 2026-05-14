import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { ScrollView, View, XStack, YStack } from "tamagui";

import { createSpace, joinSpace } from "@/api/space";
import { Button, Text, TextInput } from "@/components/ui";
import { IconSymbol } from "@/components/ui/icon-symbol";

export default function CreateSpace() {
    const [isCreatingSpace, setIsCreatingSpace] = useState<boolean | null>(null);
    const [spaceName, setSpaceName] = useState("");
    const [inviteCode, setInviteCode] = useState("");

    const router = useRouter();
    const dispatch = useDispatch();

    const handleCreateSpace = async () => {
        // Implementation for creating space
        const res = await createSpace(spaceName);
        router.replace(`/space/${res.data.id}`);
    };

    const handleJoinSpace = async () => {
        const res = await joinSpace(inviteCode);
        if (res.status === 201) {
            dispatch({ type: "space/addSpace", payload: res.data });
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container} backgroundColor="$backgroundHover">
            {isCreatingSpace === null && (
                <>
                    <YStack>
                        <Text textAlign="center" variant="label1" marginBottom={8} color="#ffffff9c">
                            Between us is
                        </Text>
                        <Text
                            textAlign="center"
                            variant="label2"
                            fontWeight="bold"
                            color="$primary"
                            fontSize={28}
                            letterSpacing={4}
                        >
                            SPACE
                        </Text>
                    </YStack>
                    <YStack gap={20} marginTop={30}>
                        <Button onPress={() => setIsCreatingSpace(true)} style={styles.option} rounded>
                            <XStack alignItems="center" width="100%" gap={12}>
                                <View style={styles.icon}>
                                    <IconSymbol name="plus" size={20} color="#ffffff" />
                                </View>
                                <YStack style={{ flex: 1 }}>
                                    <Text fontWeight="bold">Create space</Text>
                                    <Text variant="body2">Start your own space</Text>
                                </YStack>
                                <IconSymbol name="chevron.right" size={16} color="#aaa" />
                            </XStack>
                        </Button>
                        <Button onPress={() => setIsCreatingSpace(false)} style={styles.option} rounded>
                            <XStack alignItems="center" width="100%" gap={12}>
                                <View style={styles.icon}>
                                    <IconSymbol name="plus" size={20} color="#ffffff" />
                                </View>
                                <YStack style={{ flex: 1 }}>
                                    <Text fontWeight="bold">Join space</Text>
                                    <Text variant="body2">Enter an invite code</Text>
                                </YStack>
                                <IconSymbol name="chevron.right" size={16} color="#aaa" />
                            </XStack>
                        </Button>
                    </YStack>
                </>
            )}
            {isCreatingSpace === true && (
                <>
                    <Button
                        variant="text"
                        style={styles.cancelButton}
                        borderRadius={100}
                        size="$3"
                        onPress={() => setIsCreatingSpace(null)}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="text"
                        style={styles.createButton}
                        borderRadius={100}
                        size="$3"
                        onPress={handleCreateSpace}
                    >
                        Create
                    </Button>
                    <YStack marginTop={10} gap={50}>
                        <Text textAlign="center" variant="label2" color="$primary" fontSize={28}>
                            New Space
                        </Text>
                        <TextInput
                            variant="default"
                            onChangeText={setSpaceName}
                            value={spaceName}
                            placeholder="Enter space name"
                        />
                    </YStack>
                </>
            )}
            {isCreatingSpace === false && (
                <>
                    <Button
                        variant="text"
                        style={styles.cancelButton}
                        borderRadius={100}
                        size="$3"
                        onPress={() => setIsCreatingSpace(null)}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="text"
                        style={styles.createButton}
                        borderRadius={100}
                        size="$3"
                        onPress={handleJoinSpace}
                    >
                        Confirm
                    </Button>
                    <YStack marginTop={10} gap={50}>
                        <Text textAlign="center" variant="label2" color="$primary" fontSize={28}>
                            Join Space
                        </Text>
                        <TextInput
                            variant="default"
                            onChangeText={setInviteCode}
                            value={inviteCode}
                            placeholder="Enter invite code"
                        />
                    </YStack>
                </>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingInline: 20,
    },
    option: {
        width: "100%",
        height: 60,
    },
    icon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
        borderRadius: 100,
        backgroundColor: "#5e6b7c41",
    },
    cancelButton: {
        position: "absolute",
        top: 20,
        left: 20,
    },
    createButton: {
        position: "absolute",
        top: 20,
        right: 20,
    },
});
