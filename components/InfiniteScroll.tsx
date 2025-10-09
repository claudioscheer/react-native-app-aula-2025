import { Ref } from "react";
import {
  FlatList,
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text
} from "react-native";
import { FAB } from "react-native-paper";

export type InfiniteScrollProps<T> = {
  ref: Ref<FlatList>;
  data: T[];
  renderItem: ListRenderItem<T>;
  keyExtractor: (item: T, index: number) => string;
  onLoadMore: () => Promise<void>;
  onRefresh: () => Promise<void>;
  isLoading: boolean;
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => Promise<void>;
  showScrollToTop: boolean;
  onScrollToTop: () => void;
};

export function InfiniteScroll<T>(props: InfiniteScrollProps<T>) {
  const {
    data,
    renderItem,
    keyExtractor,
    onLoadMore,
    isLoading,
    onRefresh,
    ref,
    onScroll,
    showScrollToTop,
    onScrollToTop
  } = props;

  async function handleEndReached() {
    if (data.length < 1) {
      return;
    }

    console.log("handle load more");
    await onLoadMore();
  }

  return (
    <>
      <FlatList
        ref={ref}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReachedThreshold={0.3}
        onEndReached={handleEndReached}
        ListEmptyComponent={isLoading ? null : <Text>Empty List</Text>}
        refreshing={isLoading}
        onRefresh={onRefresh}
        onScroll={onScroll}
      />
      {showScrollToTop &&
        <FAB
          icon="arrow-up"
          style={styles.fab}
          onPress={() => onScrollToTop()}
        />
      }
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
