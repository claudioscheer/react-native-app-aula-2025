import { InfiniteScroll } from "@/components/InfiniteScroll";
import { Post, PostsService } from "@/services/posts";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { Card, Text } from "react-native-paper";

const POSTS_LIMIT = 10;

export default function PostScreen() {
  const [data, setData] = useState<Post[]>([]);

  async function loadInitialData() {
    try {
      const postService = new PostsService();
      const initialData = await postService.getPosts(POSTS_LIMIT, 1);
      setData(initialData.posts);
    } catch (error) {
      console.log(error);
    }
  }
  const renderItem = useCallback(({ item }: { item: Post }) => {
    return (
      <Card mode="elevated">
        <Card.Title title={item.title} titleNumberOfLines={2} titleVariant="titleLarge" />
        <Card.Content>
          <Text variant="bodyLarge">Postado por {item.author.name}</Text>
          <Text variant="bodyMedium">{item.description}</Text>
        </Card.Content>
      </Card>
    );
  }, []);

  async function handleLoadMore() {
    console.log("onLoadMore posts");
  }

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
