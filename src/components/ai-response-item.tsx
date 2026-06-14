import { AIMessage } from "@/redux/features/aiModal";
import { RootState } from "@/redux/store";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import TypingIndicator from "./typing-indicator";

const AIResponseItem = ({ item }: { item: AIMessage }) => {
    const { streamingResponse } = useSelector(
        (state: RootState) => state.aiModal
    );
    if (item.loading && streamingResponse.length) {
        return null
    }
    return (
        <View
            style={[
                styles.message,
                item.role === 'user'
                    ? styles.userMsg
                    : styles.aiMsg,
            ]}
        >
            {item.loading ? <TypingIndicator /> : <Text
                style={[
                    styles.messageText,
                    item.role === 'user' && { color: '#fff' },
                ]}
            >
                {item.text}
            </Text>}
        </View>
    )
}

export default AIResponseItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    sheet: {
        height: '80%',
        padding: 12,
        flex: 1,
    },
    header: {
        flexDirection: 'row', // ✅ replaces Row
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
    },
    chat: {
        flex: 1,
        marginVertical: 10,
    },
    message: {
        padding: 10,
        borderRadius: 12,
        marginBottom: 8,
        maxWidth: '80%',
    },
    userMsg: {
        alignSelf: 'flex-end',
        backgroundColor: '#6C63FF',
    },
    aiMsg: {
        alignSelf: 'flex-start',
        backgroundColor: '#EAEAEA',
    },
    messageText: {
        color: '#000',
    },
    inputRow: {
        flexDirection: 'row', // ✅ replaces Row
        alignItems: 'center',
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 20,
        paddingHorizontal: 12,
        backgroundColor: '#fff',
        marginRight: 8,
    },
});