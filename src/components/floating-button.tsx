import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

type FloatingActionButtonProps = {
    onPress?: () => void;
    icon?: React.ComponentProps<typeof Ionicons>['name'];
    size?: number;
    bottom?: number;
    right?: number;
    backgroundColor?: string;
};

const FloatingButton: React.FC<FloatingActionButtonProps> = ({
    onPress = () => { },
    icon = "chatbubbles",
    size = 60,
    bottom = 20,
    right = 20,
    backgroundColor = '#6200ee',
}) => {
    return (
        <View style={[styles.container, { bottom, right }]}>
            <TouchableOpacity
                style={[
                    styles.button,
                    {
                        width: size,
                        height: size,
                        borderRadius: size / 2,
                        backgroundColor,
                    },
                ]}
                onPress={onPress}
                activeOpacity={0.8}
            >
                <Ionicons name={icon} color="#fff" size={size * 0.5} />
            </TouchableOpacity>
        </View>
    );
};

export default FloatingButton;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
});