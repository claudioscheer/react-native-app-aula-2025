import { InfiniteScroll } from "@/components/InfiniteScroll";
import { Post, PostsService } from "@/services/posts";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from "react-native";
import { Card, Text } from "react-native-paper";

const POSTS_LIMIT = 10;

// Memoized PostCard component for better performance
const PostCard = memo(({ item }: { item: Post }) => {
  return (
    <Card mode="elevated" style={styles.postContainer}>
      <Card.Title
        titleStyle={styles.postTitle}
        title={item.title}
        titleNumberOfLines={2}
        titleVariant="titleLarge"
      />
      <Card.Content style={styles.postContent}>
        <Text variant="bodyLarge" style={styles.postDate}>
          Postado por {item.author.name}
        </Text>
        <Text variant="bodyMedium" style={styles.postDescription}>
          {item.description}
        </Text>
      </Card.Content>
    </Card>
  );
});

PostCard.displayName = "PostCard";

export default function PostScreen() {
  const [data, setData] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const animBottomPosition = useRef(new Animated.Value(80)).current;
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
    return <PostCard item={item} />;
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
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetY = event.nativeEvent.contentOffset.y;
      const shouldShow = offsetY > 200;

      if (shouldShow !== showScrollTop && !isAnimating) {
        setShowScrollTop(shouldShow);
        setIsAnimating(true);

        Animated.timing(animBottomPosition, {
          toValue: shouldShow ? 0 : 100,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setIsAnimating(false);
        });
      }
    },
    [showScrollTop, animBottomPosition, isAnimating],
  );

  const scrollToTop = useCallback(() => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, []);

  useEffect(() => {
    loadInitialData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
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
          scrollToTopBottomPosition={animBottomPosition}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  content: {},
  postDescription: {
    textAlign: "justify",
  },
  postTitle: {
    fontWeight: "bold",
  },
  postDate: {
    marginBottom: 4,
    fontWeight: "bold",
    textAlign: "right",
  },
  postContent: {},
  postContainer: {
    padding: 8,
    backgroundColor: "#DAB49D",
    borderRadius: 32,
    marginBottom: 16,
  },
});
