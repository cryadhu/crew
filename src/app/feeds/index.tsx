import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import FeedItem from '@/components/feed-item';
import ListView from '@/components/list-view';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { getFeeds } from '@/mocks/feeds';
import { FeedItemData, FeedResponseMeta } from '@/types/response/feeds';


export default function FeedsScreen() {
  const [data, setData] = useState<FeedItemData[]>([]);
  const [meta, setMeta] = useState<FeedResponseMeta>();

  async function fetchData(page = 1) {
    const response = await getFeeds(page);
    setMeta(response.meta);
    setData(prev => [...prev, ...response.data]);
  }

  useEffect(() => {
    fetchData();
    return () => {
      setData([]);
      setMeta(undefined);
    }
  }, []);

  const renderItem = ({ item }: { item: FeedItemData }) => {
    return (
      <FeedItem imageUri={item.heroImage}
        pricePerMonth={item.price}
        reviewCount={item.rating}
        title={item.destination}
        duration={item.duration}
        tripType={item.tripType}
        details={item.details}
        key={item.id.toString()}
      />
    )
  }

  const onLoadMore = () => {
    if (meta && meta.page * meta.limit < meta.total) {
      fetchData(meta.page + 1);
    }
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ListView data={data}
          renderItem={renderItem}
          onEndReached={onLoadMore}
        />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
    // paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  title: {
    textAlign: 'center',
  },
  code: {
    textTransform: 'uppercase',
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
});
