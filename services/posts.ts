import { SecureStoreService } from "@/utils/secureStore";

const API_HOST = "http://138.94.76.170:8023";

export type Post = {
  id: number;
  title: string;
  description: string;
  imagePath: string;
  authorId: number;
  author: {
    id: number;
    name: string;
    email: string;
  };
};

export type PostsResponseType = {
  posts: Post[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    hasNextPage: boolean;
    limit: number;
  };
};

export type PostRequest = {
  title: string;
  description: string;
};

export class PostsService {
  async getPosts(limit: number, page: number): Promise<PostsResponseType> {
    let url = `${API_HOST}/api/posts`;
    url += `?limit=${limit}&page=${page}`;

    const token = await SecureStoreService.getStoreToken();

    const request = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!request.ok) {
      throw new Error("Error fetching posts");
    }

    const response = await request.json();
    return response;
  }

  async savePost(post: PostRequest): Promise<PostsResponseType> {
    let url = `${API_HOST}/api/posts`;

    const token = await SecureStoreService.getStoreToken();

    const request = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(post),
    });
    if (!request.ok) {
      throw new Error("Error saving posts");
    }

    const response = await request.json();
    return response;
  }
}
