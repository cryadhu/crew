import { AIMessage, sendUserInput } from '@/redux/features/aiModal';
import { AppDispatch, RootState } from '@/redux/store';
import {
    BottomSheet,
    Host,
    RNHostView
} from '@expo/ui';
import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import {
    Button,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AIResponseItem from './ai-response-item';
import ListView from './list-view';

const AIBottomSheet = ({ onClose }: { onClose: () => void }) => {
    const { modalOpen, messages, aiThinking, streamingResponse } = useSelector(
        (state: RootState) => state.aiModal
    );

    const disapth = useDispatch<AppDispatch>()

    const [input, setInput] = useState('');
    const scrollRef = useRef<FlatList>(null);

    const handleSend = () => {
        if (!input.trim()) return;
        disapth(sendUserInput(input))
        setInput("")
        setTimeout(() => {
            scrollRef.current?.scrollToEnd({ animated: true });
        }, 100);
    };

    const renderItem = ({ item }: { item: AIMessage }) => {
        return <AIResponseItem item={item} />
    }

    return (
        <Host style={styles.container} pointerEvents={'none'}>
            <BottomSheet isPresented={modalOpen} onDismiss={onClose} snapPoints={['half', 'full']}>
                <RNHostView>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                        keyboardVerticalOffset={80}
                        style={{ flex: 1, }}
                    >
                        <View style={styles.sheet}>
                            <View style={styles.header}>
                                <Text style={styles.title}>Ask Crew</Text>
                                <TouchableOpacity onPress={onClose}>
                                    <Ionicons name="close-circle" size={24} />
                                </TouchableOpacity>
                            </View>
                            <ListView
                                data={messages}
                                keyExtractor={item => item.timestamp.toString()}
                                renderItem={renderItem}
                                ref={scrollRef}
                                style={styles.chat}
                                keyboardShouldPersistTaps="handled"
                                contentContainerStyle={{ paddingBottom: 16 }}
                                ListFooterComponent={
                                    <Text>{streamingResponse}</Text>
                                }
                            />
                            {/* Input */}
                            <View style={styles.inputRow}>
                                <TextInput
                                    value={input}
                                    onChangeText={setInput}
                                    placeholder="Ask anything about your trip..."
                                    placeholderTextColor="#888"
                                    style={styles.input}
                                    returnKeyType="done"
                                />
                                <Button title="Send" onPress={handleSend} disabled={aiThinking} />
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </RNHostView>
            </BottomSheet>
        </Host>
    );
};

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

export default AIBottomSheet;