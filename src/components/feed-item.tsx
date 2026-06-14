import { FeedDetail } from '@/types/response/feeds';
import { Image } from 'expo-image';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import DayChipList from './day-chip-list';
import TravelBadge from './travel-badge';
import { Collapsible } from './ui/collapsible';

export interface PropertyCardProps {
    imageUri: string;
    duration: string;
    reviewCount: number;
    title: string;
    tripType: string;
    details: FeedDetail[];
    pricePerMonth: number;
    onPress?: () => void;
}

const FeedItem = ({
    imageUri,
    duration,
    reviewCount,
    title,
    tripType,
    pricePerMonth,
    details = [],
    onPress,
}: PropertyCardProps) => {
    return (
        <View style={styles.card}>
            <Image
                source={{ uri: imageUri}}
                style={styles.heroImage}
                placeholder={{blurhash:"LGF5?xYk^6#M@-5c,1J5@[or[Q6." }}
                transition={2000}
            />

            <View style={styles.content}>
                <View style={styles.locationRow}>
                    <View style={styles.locationLeft}>
                        <Text style={styles.title}>{title}</Text>
                    </View>
                    <Text style={styles.reviewText}>{reviewCount} ★</Text>
                </View>
                <View style={styles.locationRow}>
                    <Text style={styles.duration}>{duration}</Text>
                    <TravelBadge type={tripType} />
                </View>
                <View style={styles.divider} />

                <View style={styles.footer}>
                    <View style={styles.priceContainer}>
                        <Text style={styles.priceAmount}>₹{pricePerMonth}</Text>
                    </View>
                </View>
                <Collapsible title='Details' >
                    <DayChipList details={details} />
                </Collapsible>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.10,
        shadowRadius: 12,
        elevation: 5,
        marginVertical: 10,
    },
    heroImage: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    content: {
        paddingTop: 14,
        paddingBottom: 16,
    },
    locationRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    locationLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    pinIcon: {
        fontSize: 13,
    },
    locationText: {
        fontSize: 13,
        color: '#6B7280',
        fontWeight: '400',
    },
    reviewText: {
        fontSize: 13,
        color: '#6B7280',
        fontWeight: '400',
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
        letterSpacing: -0.3,
    },
    duration: {
        fontSize: 14,
        fontWeight: '700',
        color: '#111827',
        letterSpacing: -0.3,
    },
    amenitiesRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 14,
    },
    amenityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    amenityIcon: {
        fontSize: 14,
    },
    amenityLabel: {
        fontSize: 13,
        color: '#374151',
        fontWeight: '500',
    },
    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#E5E7EB',
        marginBottom: 14,
        marginTop: 6,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 1,
    },
    priceAmount: {
        fontSize: 18,
        fontWeight: '800',
        color: '#111827',
        letterSpacing: -0.5,
    },
    pricePeriod: {
        fontSize: 14,
        color: '#6B7280',
        fontWeight: '500',
    },
    ctaButton: {
        paddingVertical: 12,
        alignSelf: 'baseline'
    },
    ctaText: {
        color: '#1F2937',
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: 0.1,
    },
});

export default FeedItem;