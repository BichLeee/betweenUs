import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Tabs } from "tamagui";

import { Text } from "@/components/ui";
import { PeopleTab } from "./_components/PeopleTab";
import { SpacesTab } from "./_components/SpacesTab";

export default function HomeScreen() {
    const [activeTab, setActiveTab] = useState<string>("tab0");

    const insets = useSafeAreaInsets();

    return (
        <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            orientation="horizontal"
            flexDirection="column"
            width="100%"
            height="100%"
            paddingInline={8}
            paddingTop={insets.top}
        >
            <Tabs.List>
                <Tabs.Tab style={{ opacity: activeTab === "tab0" ? 1 : 0.5 }} opacity={1} flex={1} value="tab0">
                    <Text variant="body3" fontWeight="thin" letterSpacing={-0.2}>
                        Spaces
                    </Text>
                </Tabs.Tab>
                <Tabs.Tab style={{ opacity: activeTab === "tab1" ? 1 : 0.5 }} opacity={1} flex={1} value="tab1">
                    <Text variant="body3" fontWeight="thin" letterSpacing={-0.2}>
                        People
                    </Text>
                </Tabs.Tab>
            </Tabs.List>
            <Tabs.Content value="tab0" style={{ height: "100%", width: "100%" }}>
                <SpacesTab />
            </Tabs.Content>
            <Tabs.Content value="tab1" style={{ height: "100%", width: "100%" }}>
                <PeopleTab />
            </Tabs.Content>
        </Tabs>
    );
}
