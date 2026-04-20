import { useLocalSearchParams, useRouter } from "expo-router";
import { debounce } from "lodash";
import { useEffect, useMemo, useRef, useState } from "react";
import { FlatList, View } from "react-native";
import { useSelector } from "react-redux";

import { getSpaceDetail } from "@/api/space";
import { Button, Text, TextInput } from "@/components/ui";
import { getSocket } from "@/socket/socket";
import { useSocket } from "@/socket/useSocket";

export default function SpaceScreen() {
    const router = useRouter();
    const { spaceId }: { spaceId: string } = useLocalSearchParams();
    const { user } = useSelector((state: any) => state.user);

    const [lines, setLines] = useState<any[]>([]);
    const [locks, setLocks] = useState<{ [key: string]: string }>({});
    const [activeLine, setActiveLine] = useState(0);
    const socket = getSocket();

    const extraLineList = useMemo(() => [...lines, { id: 0, text: "" }], [lines]);

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
    });

    const handleBackButton = () => {
        router.replace(`/(tabs)`);
    };

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

    const handleNewLine = (event: any, index: number) => {
        //get the component then active the next one
        if (event.nativeEvent.key === "Enter") {
            socket.emit("create_line", { spaceId, afterOrder: lines[activeLine].order, userId: user?.id });
        }
    };

    const fetchSpaceDetail = async () => {
        const res = await getSpaceDetail(spaceId);
        console.log(res);
        if (res.data) {
            setLines([...res.data.entries]);
        }
    };

    useEffect(() => {
        fetchSpaceDetail();
    }, [spaceId]);

    return (
        <View style={{ flex: 1, flexDirection: "column" }}>
            <Text color="#000">Space</Text>
            <FlatList
                data={extraLineList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={({ item, index }) => (
                    <TextInput
                        value={lines[index]?.content}
                        onChangeText={(value) => handleChange(index, value)}
                        multiline
                        autoFocus={index === activeLine}
                        onFocus={() => setActiveLine(index)}
                        style={{
                            borderBottomWidth: 1,
                            paddingVertical: 8,
                            minHeight: 40,
                            color: "white",
                            backdropFilter: locks[item.id] ? "blur(5px)" : "none",
                        }}
                        // onKeyPress={(e) => handleNewLine(e, index)}
                        readOnly={locks[item.id] && locks[item.id] !== user?.id}
                    />
                )}
            />
            <Button onPress={handleBackButton}>back</Button>
        </View>
    );
}
