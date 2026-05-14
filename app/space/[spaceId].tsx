import { useLocalSearchParams, useRouter } from "expo-router";
import { debounce } from "lodash";
import { useEffect, useMemo, useRef, useState } from "react";
import { FlatList } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { useTheme, View, XStack } from "tamagui";

import { getSpaceDetail } from "@/api/space";
import { Button, Text, TextInput } from "@/components/ui";
import { IconSymbol } from "@/components/ui/icon-symbol.ios";
import { getSocket } from "@/socket/socket";
import { useSocket } from "@/socket/useSocket";

export default function SpaceScreen() {
    const router = useRouter();
    const { spaceId }: { spaceId: string } = useLocalSearchParams();
    const { user } = useSelector((state: any) => state.user);
    const socket = getSocket();
    const insets = useSafeAreaInsets();
    const theme = useTheme();

    const [lines, setLines] = useState<any[]>([]);
    const [space, setSpace] = useState<any>(null);
    const [locks, setLocks] = useState<{ [key: string]: string }>({});
    const [activeLineId, setActiveLineId] = useState<number | null>(null);

    //need to handle
    const orderedLines = useMemo(() => [...lines].sort((a, b) => a.entry_order - b.entry_order), [lines]);

    useSocket(spaceId, {
        onLocked: (data: any) => {
            setLocks((prev) => ({ ...prev, [data.lineId]: data.userId }));
        },
        onUnlocked: (data: any) => {
            setLocks((prev) => {
                const newLocks = { ...prev };
                delete newLocks[data.lineId];
                return newLocks;
            });
        },
        onUpdated: (data: any) => {
            console.log("updated", data);
            setLines((prev) => {
                const newLines = [...prev];
                const lineIndex = newLines.findIndex((l) => l.id === data.lineId);
                if (lineIndex !== -1) {
                    newLines[lineIndex] = { ...newLines[lineIndex], content: data.text };
                }
                return newLines;
            });
        },
        onLineCreated: (data: any) => {
            setLines((prev) => [...prev, data]);
        },
        onLineDeleted: (data: any) => {
            setLines((prev) => prev.filter((line) => line.id !== data.lineId));
        },
    });

    const sendUpdate = useRef(
        debounce((payload: any) => {
            socket.emit("update_line", payload);
        }, 300),
    ).current;

    const handleChange = (index: number, value: string) => {
        const lineId = lines[index]?.id;
        if (!lineId) return;

        setLines((prev) => {
            const newLines = [...prev];
            newLines[index] = { ...newLines[index], content: value };
            return newLines;
        });

        sendUpdate({ spaceId, lineId, text: value, userId: user?.id });
    };

    const fetchSpaceDetail = async () => {
        const res = await getSpaceDetail(spaceId);
        if (res.data) {
            setSpace(res.data);
            setLines([...res.data.entries]);
        }
    };

    const handleNewLine = (afterOrder: number) => {
        socket.emit("create_line", {
            spaceId,
            afterOrder: afterOrder,
            userId: user?.id,
        });
    };

    const handleDeleteLine = (lineId: string) => {
        socket.emit("delete_line", { spaceId, lineId, userId: user?.id });
    };

    useEffect(() => {
        fetchSpaceDetail();
    }, [spaceId]);

    const renderItems = ({ item, index }: { item: any; index: number }) => {
        return (
            <ReanimatedSwipeable
                friction={1}
                rightThreshold={30}
                leftThreshold={300}
                overshootRight={true}
                enabled={!locks[item.id]}
                renderRightActions={() => (
                    <XStack height="100%" alignItems="flex-end">
                        <Button
                            variant="text"
                            height={30}
                            width={48}
                            padding={0}
                            onPress={() => handleNewLine(item.entry_order)}
                        >
                            <IconSymbol name="plus" size={16} color="#ffffff" />
                        </Button>
                        <Button
                            variant="text"
                            height={30}
                            width={40}
                            padding={0}
                            onPress={() => handleDeleteLine(item.id)}
                        >
                            <IconSymbol name="minus" size={16} color="#ffffff" />
                        </Button>
                    </XStack>
                )}
            >
                <View key={`${index + item.id}`} position="relative">
                    <TextInput
                        value={orderedLines[index]?.content}
                        onChange={(event) => handleChange(index, event.target.value)}
                        // autoFocus={index === activeLine}
                        onFocus={() => {
                            if (activeLineId === item.id) return;
                            socket.emit("lock_line", { lineId: item.id, spaceId, userId: user?.id });
                        }}
                        onBlur={() => {
                            socket.emit("unlock_line", { lineId: item.id, spaceId, userId: user?.id });
                        }}
                        multiline
                        borderRadius={0}
                        borderWidth={0}
                        borderBottomWidth={1}
                        paddingTop={12}
                        paddingBottom={8}
                        borderBottomColor={"#cccccc24"}
                        backgroundColor="transparent"
                        lineHeight={24}
                        height="fit-content"
                        // onKeyPress={(e) => handleNewLine(e, index)}
                        readOnly={locks[item.id] && locks[item.id] !== user?.id}
                        opacity={locks[item.id] ? 0.6 : 1}
                    />
                </View>
                {locks[item.id] && (
                    <XStack position="absolute" bottom={0} right={4} alignItems="center" gap={4}>
                        <IconSymbol name="pencil.slash" size={14} color={theme.primary.val} />
                        <Text variant="body2" fontSize={10} color="$primary">
                            {space.members.find((m: any) => m.id === locks[item.id])?.username || "Unknown User"}
                        </Text>
                    </XStack>
                )}
            </ReanimatedSwipeable>
        );
    };

    return (
        <GestureHandlerRootView>
            <View style={{ position: "relative", flex: 1 }}>
                <XStack
                    alignItems="center"
                    justifyContent="space-between"
                    position="sticky"
                    paddingTop={insets.top}
                    top={0}
                    left={0}
                    width="100%"
                    backgroundColor="$backgroundHover"
                    zIndex={1}
                    paddingInline={12}
                    paddingBottom={8}
                >
                    <Button
                        variant="icon"
                        height={40}
                        width={40}
                        backgroundColor="transparent"
                        onPress={() => router.replace("/")}
                    >
                        <IconSymbol name="chevron.backward" size={14} color="#fff" />
                    </Button>
                    <Text color="#fff">{space?.name}</Text>
                    <Button variant="icon" height={40} width={40} backgroundColor="transparent">
                        <IconSymbol name="ellipsis" size={14} color="#fff" />
                    </Button>
                </XStack>
                <XStack position="absolute" bottom={insets.bottom} zIndex={1} justifyContent="center" width="100%">
                    <Button
                        variant="icon"
                        onPress={() => handleNewLine(orderedLines[orderedLines.length - 1]?.entry_order)}
                    >
                        <IconSymbol name="plus" size={16} color="#fff" />
                    </Button>
                </XStack>
                <Text variant="header2" color="#fff">
                    {space?.name}
                </Text>
                <FlatList
                    data={orderedLines}
                    style={{ paddingTop: 120, paddingInline: 12, marginBottom: 0, paddingBottom: 80 }}
                    renderItem={renderItems}
                />
            </View>
        </GestureHandlerRootView>
    );
}
