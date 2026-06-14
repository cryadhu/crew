import { toggleModal } from "@/redux/features/aiModal";
import { Stack } from "expo-router";
import { useDispatch } from "react-redux";
import AIBottomSheet from "./ai-bottom-sheet";
import FloatingButton from "./floating-button";

const RootComponents = () => {
    const dispatch = useDispatch();

    const toggleAIModal = () => {
        dispatch(toggleModal());
    }
    return (
        <>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="feeds" options={{ headerShown: false }} />
            </Stack>
            <FloatingButton onPress={toggleAIModal} />
            <AIBottomSheet onClose={toggleAIModal}/>
        </>
    )
}

export default RootComponents;