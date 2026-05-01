import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Modal, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { View } from "tamagui";

import { createSpace, getSpaces, joinSpace } from "@/api/space";
import { HelloWave } from "@/components/hello-wave";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { Button, Text, TextInput } from "@/components/ui";

export default function HomeScreen() {
    const { user } = useSelector((state: any) => state.user);
    const router = useRouter();
    const dispatch = useDispatch();
    const { spaces } = useSelector((state: any) => state.space);

    const [modalCreate, setModalCreate] = useState(false);
    const [modalJoin, setModalJoin] = useState(false);
    const [spaceName, setSpaceName] = useState("");
    const [inviteCode, setInviteCode] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCreateSpace = async () => {
        // Implementation for creating space
        const res = await createSpace(spaceName);
        setModalCreate(false);
    };

    const handleJoinSpace = async () => {
        const res = await joinSpace(inviteCode);
        console.log(res);
        if (res.status === 201) {
            dispatch({ type: "space/addSpace", payload: res.data });
        }
        setModalJoin(false);
    };

    const fetchSpaces = async () => {
        // Implementation for fetching spaces

        const { status, data } = await getSpaces();
        if (status === 200) {
            dispatch({ type: "space/setSpaces", payload: data });
            console.log(data);
        }
    };

    useEffect(() => {
        fetchSpaces();
    }, []);

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
            headerImage={
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-end",
                        gap: 16,
                        marginTop: "auto",
                        marginBottom: 20,
                        marginInline: 20,
                    }}
                >
                    <Image source={require("../../assets/images/avatar-default.jpg")} style={styles.avatar} />
                    <Text variant="header1" color="#000">
                        {user?.username || "User"}
                    </Text>
                </View>
            }
        >
            <View style={styles.titleContainer}>
                <Text>Welcome!</Text>
                <HelloWave />
            </View>
            <View>
                <Button onPress={() => setModalCreate(true)}>Create space</Button>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalCreate}
                    onRequestClose={() => {
                        // Alert.alert("Modal has been closed.");
                        setModalCreate(!modalCreate);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TextInput
                                style={{ backgroundColor: "transparent", marginBottom: 20 }}
                                variant="primary"
                                onChangeText={setSpaceName}
                                value={spaceName}
                                placeholder="Enter space name"
                            />
                            <Button onPress={() => setModalCreate(false)}>Close</Button>
                            <Button onPress={handleCreateSpace}>Create</Button>
                        </View>
                    </View>
                </Modal>
            </View>
            <View>
                <Button onPress={() => setModalJoin(true)}>Join space</Button>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalJoin}
                    onRequestClose={() => {
                        // Alert.alert("Modal has been closed.");
                        setModalJoin(!modalJoin);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TextInput
                                style={{ backgroundColor: "transparent", marginBottom: 20 }}
                                variant="primary"
                                onChangeText={setInviteCode}
                                value={inviteCode}
                                placeholder="Enter invite code"
                            />
                            <Button onPress={() => setModalJoin(false)}>Close</Button>
                            <Button onPress={handleJoinSpace}>Join</Button>
                        </View>
                    </View>
                </Modal>
            </View>
            <View>
                <Text style={{ marginBlock: 10 }}>Space List</Text>
                {spaces?.map((space: any) => (
                    <View key={space.id}>
                        <Button size="small" onPress={() => router.replace(`/space/${space.id}`)}>
                            {space.name}
                        </Button>
                    </View>
                ))}
            </View>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 25,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
});
