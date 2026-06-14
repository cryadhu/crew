import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface AIMessage {
    text: string,
    timestamp: number,
    role: 'user' | 'ai',
    loading?: boolean
}

export interface AIModalState {
    modalOpen: boolean,
    messages: AIMessage[],
    aiThinking: boolean
}

const initialState: AIModalState = {
    modalOpen: false,
    messages: [],
    aiThinking: false
}

export const sendUserInput = createAsyncThunk(
    'message/sendUserInput',
    async (message: string, thunkAPI) => {
        const payload: AIMessage = {
            text: message,
            timestamp: new Date().getTime(),
            role: 'user'
        }
        const aiPayload: AIMessage = {
            text: '',
            timestamp: new Date().getTime(),
            role: 'ai',
            loading: true
        }
        thunkAPI.dispatch(pushMessage(payload))
        thunkAPI.dispatch(setAIThinking());
        thunkAPI.dispatch(pushMessage(aiPayload))
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
        setAIThinking: (state) => {
            state.aiThinking = true
        },
        setAINotThinking: (state) => {
            state.aiThinking = false
        }
    }
})

export const { toggleModal, pushMessage, setAIThinking, setAINotThinking } = aiModalSlice.actions

export default aiModalSlice.reducer