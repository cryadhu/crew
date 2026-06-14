import React from "react"
import { Text } from "react-native"

const getBadge = (type: string) => {
    switch (type) {
        case 'Flight + Stay':
            return '✈️🏨'
        case 'Experience':
            return '🎒'
        case 'Villa':
            return '🏠'
        default:
            return '🧳';
    }
}
const TravelBadge = ({ type }: { type: string }) => {
    return <Text>{getBadge(type)}</Text>;
}

export default React.memo(TravelBadge)