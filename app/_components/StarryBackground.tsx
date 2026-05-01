import { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

type StarType = {
    x: number;
    y: number;
    opacity: number;
    size: number;
    dx: number;
    dy: number;
};

const STAR_COUNT = 80;

const stars: StarType[] = Array.from({ length: STAR_COUNT }).map(() => ({
    x: Math.random() * width,
    y: Math.random() * height,
    opacity: Math.random(),
    size: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 300, // movement range
    dy: (Math.random() - 0.5) * 300,
}));

export default function StarryBackground() {
    return (
        <View style={styles.container}>
            {stars.map((star, i) => (
                <Star key={i} star={star} />
            ))}
        </View>
    );
}

function Star({ star }: { star: StarType }) {
    const progress = useSharedValue(0);

    useEffect(() => {
        progress.value = withRepeat(
            withTiming(1, { duration: 12000 }), // we’ll tune this
            -1,
            true,
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: star.dx * progress.value }, { translateY: star.dy * progress.value }],
        opacity: star.opacity,
    }));

    return (
        <Animated.View
            style={[
                styles.star,
                {
                    width: star.size,
                    height: star.size,
                    top: star.y,
                    left: star.x,
                },
                animatedStyle,
            ]}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "#000",
        zIndex: -1,
    },
    star: {
        position: "absolute",
        backgroundColor: "#fff",
        borderRadius: 2,
    },
});
