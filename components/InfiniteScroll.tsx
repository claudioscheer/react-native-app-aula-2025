import { FlatList, ListRenderItem, Text } from "react-native";

export type InfiniteScrollProps<T> = {
  data: T[];
  renderItem: ListRenderItem<T>;
  keyExtractor: (item: T, index: number) => string;
  onLoadMore: () => Promise<void>;
  onRefresh: () => Promise<void>;
  isLoading: boolean;
};

export function InfiniteScroll<T>(props: InfiniteScrollProps<T>) {
  const {
    data,
    renderItem, keyExtractor, onLoadMore,
    isLoading,
    onRefresh,
  } = props;

  async function handleEndReached() {
    if (data.length < 1) {
        return;
    }

    console.log("handle load more")
    await onLoadMore();
  }

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onEndReachedThreshold={0.3}
      onEndReached={handleEndReached}
      ListEmptyComponent={isLoading ? null : <Text>Empty List</Text>}
      refreshing={isLoading}
      onRefresh={onRefresh}
    />
  );
}
