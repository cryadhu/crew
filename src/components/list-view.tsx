import React, { useCallback, useRef } from 'react';
import { FlatList, FlatListProps, ListRenderItemInfo } from 'react-native';

export interface ListViewProps<T>
  extends Omit<
    FlatListProps<T>,
    | 'renderItem'
    | 'getItemLayout'
    | 'windowSize'
    | 'maxToRenderPerBatch'
    | 'updateCellsBatchingPeriod'
    | 'initialNumToRender'
    | 'removeClippedSubviews'
  > {
  renderItem: (info: ListRenderItemInfo<T>) => React.ReactElement | null;
  itemHeight?: number;
  windowSize?: number;
  maxToRenderPerBatch?: number;
  updateCellsBatchingPeriod?: number;
  initialNumToRender?: number;
}

function ListViewInner<T>(
  {
    renderItem,
    itemHeight,
    windowSize = 5,
    maxToRenderPerBatch = 8,
    updateCellsBatchingPeriod = 50,
    initialNumToRender = 10,
    keyExtractor,
    ...rest
  }: ListViewProps<T>,
  ref: React.Ref<FlatList<T>>,
) {
  const renderItemRef = useRef(renderItem);
  renderItemRef.current = renderItem;

  const stableRenderItem = useCallback(
    (info: ListRenderItemInfo<T>) => renderItemRef.current(info),
    [],
  );

  const getItemLayout = useCallback(
    (_: ArrayLike<T> | null | undefined, index: number) => ({
      length: itemHeight!,
      offset: itemHeight! * index,
      index,
    }),
    [itemHeight],
  );

  return (
    <FlatList<T>
      ref={ref}
      {...rest}
      renderItem={stableRenderItem}
      keyExtractor={keyExtractor}
      getItemLayout={itemHeight ? getItemLayout : undefined}
      windowSize={windowSize}
      maxToRenderPerBatch={maxToRenderPerBatch}
      updateCellsBatchingPeriod={updateCellsBatchingPeriod}
      initialNumToRender={initialNumToRender}
      removeClippedSubviews
      scrollEventThrottle={16}
    />
  );
}

export const ListView = React.forwardRef(ListViewInner) as <T>(
  props: ListViewProps<T> & { ref?: React.Ref<FlatList<T>> },
) => React.ReactElement | null;

export default ListView;