import { generateResponse } from '@/mocks/ai';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AIMessage {
    text: string,
    timestamp: number,
    role: 'user' | 'ai',
    loading?: boolean,
}

export interface AIModalState {
    modalOpen: boolean,
    messages: AIMessage[],
    aiThinking: boolean,
    streamingResponse: string,
}

const initialState: AIModalState = {
    modalOpen: false,
    messages: [],
    aiThinking: false,
    streamingResponse: ""
}

export const processAIOutput = createAsyncThunk(
    'message/processAIOutput',
    async (aiTS: number, thunkAPI) => {
        generateResponse((partial) => {
            thunkAPI.dispatch(setStreamingMessage(partial));
        }, (final: string) => {
            thunkAPI.dispatch(setStreamingMessage(''));
            thunkAPI.dispatch(setAINotThinking());
            thunkAPI.dispatch(updateMessage({
                key: aiTS,
                message: final
            }))
        })
    }
);

export const sendUserInput = createAsyncThunk(
    'message/sendUserInput',
    async (message: string, thunkAPI) => {
        const payload: AIMessage = {
            text: message,
            timestamp: new Date().getTime(),
            role: 'user'
        }
        thunkAPI.dispatch(pushMessage(payload))
        setTimeout(() => {
            const aiTS = new Date().getTime()
            const aiPayload: AIMessage = {
                text: '',
                timestamp: aiTS,
                role: 'ai',
                loading: true
            }
            thunkAPI.dispatch(setAIThinking());
            thunkAPI.dispatch(pushMessage(aiPayload))
            setTimeout(() => {
                thunkAPI.dispatch(processAIOutput(aiTS))
            }, 500);
        }, 100)
    },
)


export const aiModalSlice = createSlice({
    name: 'aiModal',
    initialState,
    reducers: {
        toggleModal: (state) => {
            state.modalOpen = !state.modalOpen
        },
        pushMessage: (state, action) => {
            const messages = [...state.messages]
            messages.push(action.payload)
            state.messages = messages
        },
        updateMessage: (state, action: PayloadAction<{ message: string, key: number }>) => {
            const messages = [...state.messages]
            const msg = messages.find(item => item.timestamp === action.payload.key);
            msg!!.text = action.payload.message;
            msg!!.loading = false
            state.messages = messages
        },
        setAIThinking: (state) => {
            state.aiThinking = true
        },
        setAINotThinking: (state) => {
            state.aiThinking = false
        },
        setStreamingMessage: (state, action) => {
            state.streamingResponse = action.payload
        }
    }
})

export const {
    toggleModal, pushMessage, setAIThinking,
    setAINotThinking, setStreamingMessage, updateMessage
} = aiModalSlice.actions

export default aiModalSlice.reducer