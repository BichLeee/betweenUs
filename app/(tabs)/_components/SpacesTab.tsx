import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView, YStack } from "tamagui";

import { getSpaces } from "@/api/space";
import { Space } from "./Space";

export const SpacesTab = () => {
    const dispatch = useDispatch();
    const { spaces } = useSelector((state: any) => state.space);

    const [loading, setLoading] = useState(false);

    const fetchSpaces = async () => {
        // Implementation for fetching spaces
        setLoading(true);
        const { status, data } = await getSpaces();
        if (status === 200) {
            dispatch({ type: "space/setSpaces", payload: data });
            console.log(data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchSpaces();
    }, []);

    return (
        <ScrollView width="100%" marginTop={20}>
            <YStack gap={20}>
                {spaces?.map((space: any) => (
                    <Space key={space.id} space={space} />
                ))}
            </YStack>
        </ScrollView>
    );
};
