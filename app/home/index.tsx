import { InfiniteScroll } from "@/components/InfiniteScroll";
import { Post, PostsService } from "@/services/posts";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { Card, Text } from "react-native-paper";

const POSTS_LIMIT = 10;

export default function PostScreen() {
  const [data, setData] = useState<Post[]>([]);
  const [page, setPage] = useState(1);

  const postService = new PostsService();

  async function loadInitialData() {
    try {
      const initialData = await postService.getPosts(POSTS_LIMIT, page);
      console.log("initial data", initialData.posts.map(x => x.id))
      setData(initialData.posts);
    } catch (error) {
      console.log(error);
    }
  }

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
    try {
      const newPage = page + 1;
      const posts = await postService.getPosts(POSTS_LIMIT, newPage);
      setData((prevData) => [...prevData, ...posts.posts]);
      setPage(newPage);
    } catch (error) {
      console.log(error);
    }
  }, [data, page]);

  useEffect(() => {
    loadInitialData();
  }, []);

  return (
    <View>
      <InfiniteScroll
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        onLoadMore={handleLoadMore}
      />
    </View>
  );
}
