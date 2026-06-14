import { FeedDetail } from '@/types/response/feeds';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const ACCENT_COLORS = ['#6366F1', '#EC4899', '#F59E0B', '#10B981', '#3B82F6', '#EF4444'];

const getIconName = (icon: string) => {
  const iconMap = {
    home: 'home-outline',
    sunset: 'sunny-outline',
    temple: 'business-outline',
    pool: 'water-outline',
    shopping: 'bag-outline',
    spa: 'leaf-outline',
    wine: 'wine-outline',
    tower: 'radio-tower-outline',
    desert: 'umbrella-outline',
    mountain: 'triangle-outline',
    museum: 'library-outline',
    paragliding: 'airplane-outline',
    water: 'water-outline',
    snow: 'snow-outline',
    boat: 'boat-outline',
    flight: 'airplane-outline',
    beach: 'umbrella-outline',
    relax: 'bed-outline',
    hotel: 'bed-outline',
  };

  return iconMap[icon] ?? 'ellipse-outline';
};

const DayChip = ({ item, index }: { item: FeedDetail; index: number }) => {
  const color = ACCENT_COLORS[index % ACCENT_COLORS.length];
  const iconName = getIconName(item.icon);

  return (
    <View style={[styles.chip, { borderColor: color }]}>
      <Ionicons name={iconName} size={14} color={color} />
      <Text style={[styles.chipDay, { color }]}>{item.day}</Text>
      <Text style={styles.chipText}>{item.text}</Text>
    </View>
  );
};

const DayChipList = ({ details = [] }: { details: FeedDetail[] }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {details.map((item, index) => (
        <DayChip key={index} item={item} index={index} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: '#F9FAFB',
  },
  chipDay: {
    fontSize: 12,
    fontWeight: '700',
  },
  chipText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '400',
  },
});

export default DayChipList;