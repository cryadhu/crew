import { toggleModal } from "@/redux/features/aiModal";
import { Stack } from "expo-router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import AIBottomSheet from "./ai-bottom-sheet";
import FloatingButton from "./floating-button";
import MonitorUI from "./monitor-ui";

const RootComponents = () => {
    const dispatch = useDispatch();
    const [monitorVisible, setmonitorVisible] = useState(false)

    const toggleAIModal = () => {
        dispatch(toggleModal());
    }

    const toggleMonitorVisible = () => {
        setmonitorVisible(prev => !prev)
    }

    return (
        <>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="feeds" options={{ headerShown: false }} />
            </Stack>
            <FloatingButton onPress={toggleAIModal} />
            <AIBottomSheet onClose={toggleAIModal} />
            <FloatingButton onPress={toggleMonitorVisible} position="top" icon="bug" />
            <MonitorUI open={monitorVisible} onClose={toggleMonitorVisible}/>
        </>
    )
}

export default RootComponents;