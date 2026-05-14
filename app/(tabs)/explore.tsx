import { View } from "react-native";
import { ScrollView } from "tamagui";

import { signOut } from "@/api/auth";
import { Button, Text } from "@/components/ui";

export default function TabTwoScreen() {
    const handleLogout = async () => {
        await signOut();
    };

    return (
        <ScrollView>
            <View>
                <Button onPress={handleLogout} marginTop={50}>
                    <Text color="#000">Logout</Text>
                </Button>
            </View>
        </ScrollView>
    );
}
