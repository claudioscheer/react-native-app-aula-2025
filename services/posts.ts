const API_HOST = "http://138.94.76.170:8023";

type PostsResponseType = {
  posts: {
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
  }[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    hasNextPage: boolean;
    limit: number;
  };
};

export class PostsService {
  async getPosts(limit: number, page: number): Promise<PostsResponseType> {
    let url = `${API_HOST}/api/posts`;
    url += `?limit=${limit}&page=${page}`;

    const request = await fetch(url);
    if (!request.ok) {
      throw new Error("Error fetching posts");
    }

    const response = await request.json();
    return response;
  }
}
