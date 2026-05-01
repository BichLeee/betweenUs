import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import { Text, View, styled } from "tamagui";

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

const Container = styled(View, {
    borderRadius: 14,
    overflow: "hidden",
    border: "1px solid $borderColor",
});

const Inner = styled(View, {
    backgroundColor: "black",
    margin: 1, // 👈 tạo border
    borderRadius: 13,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: "center",
});

const Label = styled(Text, {
    color: "white",
    fontWeight: "600",
});

export function GlowButton({ children, onPress }) {
    const rotate = useSharedValue(0);

    useEffect(() => {
        rotate.value = withRepeat(withTiming(400, { duration: 4200 }), -1, false);
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotate.value}deg` }],
    }));

    return (
        <Container onPress={onPress}>
            {/* Animated border */}
            <AnimatedGradient
                colors={["transparent", "white", "transparent", "transparent"]}
                style={[
                    {
                        position: "absolute",
                        width: "200%",
                        height: "200%",
                        top: "-50%",
                        left: "-50%",
                    },
                    animatedStyle,
                ]}
            />

            {/* Inner button */}
            <Inner>
                <Label>{children}</Label>
            </Inner>
        </Container>
    );
}
