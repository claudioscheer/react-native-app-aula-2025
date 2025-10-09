import { InfiniteScroll } from "@/components/InfiniteScroll";
import { Post, PostsService } from "@/services/posts";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
} from "react-native";
import { Card, Text } from "react-native-paper";

const POSTS_LIMIT = 10;

export default function PostScreen() {
  const [data, setData] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const dataRef = useRef(data);

  const postService = new PostsService();

  // Keep ref in sync with state
  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  async function loadInitialData() {
    setIsLoading(true);
    try {
      const initialData = await postService.getPosts(POSTS_LIMIT, page);
      console.log(
        "initial data",
        initialData.posts.map((x) => x.id),
      );
      setData(initialData.posts);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  const onRefresh = useCallback(async () => {
    setIsLoading(true);
    try {
      setPage(1);
      const initialData = await postService.getPosts(POSTS_LIMIT, 1);
      console.log(
        "refresh initial data",
        initialData.posts.map((x) => x.id),
      );
      setData(initialData.posts);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }, []);

  const renderItem = useCallback(({ item }: { item: Post }) => {
    return (
      <Card mode="elevated">
        <Card.Title
          title={item.title}
          titleNumberOfLines={2}
          titleVariant="titleLarge"
        />
        <Card.Content>
          <Text variant="bodyLarge">Postado por {item.author.name}</Text>
          <Text variant="bodyMedium">{item.description}</Text>
        </Card.Content>
      </Card>
    );
  }, []);

  const handleLoadMore = useCallback(async () => {
    if (dataRef.current.length < 1) {
      return;
    }

    setIsLoading(true);
    try {
      const newPage = page + 1;
      const posts = await postService.getPosts(POSTS_LIMIT, newPage);
      setData((prevData) => [...prevData, ...posts.posts]);
      setPage(newPage);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }, [page]);

  const onScroll = useCallback(
    async (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetY = event.nativeEvent.contentOffset.y;
      setShowScrollTop(offsetY > 200);
    },
    [],
  );

  const scrollToTop = useCallback(() => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, []);

  useEffect(() => {
    loadInitialData();
  }, []);

  return (
    <View>
      <InfiniteScroll
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        onLoadMore={handleLoadMore}
        onRefresh={onRefresh}
        isLoading={isLoading}
        onScroll={onScroll}
        showScrollToTop={showScrollTop}
        onScrollToTop={scrollToTop}
      />
    </View>
  );
}
