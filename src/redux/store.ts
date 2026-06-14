import { aiModalSlice } from '@/redux/features/aiModal'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {
        aiModal: aiModalSlice.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

