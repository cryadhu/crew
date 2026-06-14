import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';

const Dot = ({ delay }: { delay: number }) => {
    const scale = useSharedValue(0.5);
    const opacity = useSharedValue(0.3);

    useEffect(() => {
        scale.value = withRepeat(
            withSequence(
                withDelay(delay, withTiming(1.2, { duration: 300 })),
                withTiming(0.5, { duration: 300 })
            ),
            -1,
            false
        );

        opacity.value = withRepeat(
            withSequence(
                withDelay(delay, withTiming(1, { duration: 300 })),
                withTiming(0.3, { duration: 300 })
            ),
            -1,
            false
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
    }));

    return <Animated.View style={[styles.dot, animatedStyle]} />;
};

const TypingIndicator = () => {
    return (
        <View style={styles.container}>
            <Dot delay={0} />
            <Dot delay={150} />
            <Dot delay={300} />
        </View>
    );
};

export default TypingIndicator;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 2,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#999',
        marginHorizontal: 4,
    },
});