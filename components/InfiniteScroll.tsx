import { FlatList, ListRenderItem, Text } from "react-native";

export type InfiniteScrollProps<T> = {
  data: T[];
  renderItem: ListRenderItem<T>;
  keyExtractor: (item: T, index: number) => string;
  onLoadMore: () => Promise<void>;
};

export function InfiniteScroll<T>(props: InfiniteScrollProps<T>) {
  const { data, renderItem, keyExtractor } = props;

  async function handleEndReached() {
    console.log("end reached. load more");
  }

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onEndReachedThreshold={0.3}
      onEndReached={handleEndReached}
      ListEmptyComponent={<Text>Empty List</Text>}
    />
  );
}
