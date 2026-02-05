// services/blogService.ts

export interface Post {
  id: string;
  title: string;
  slug: string;
  createdAt: string;
  category?: {
    name: string;
  };
  author?: {
    name: string;
  };
  coverImage?: {
    url: string;
  };
}

export interface GetPaginatedPostsResponse {
  posts: Post[];
  postsConnection: {
    aggregate: {
      count: number;
    };
  };
}

export interface BlogDetailPost {
  id: string;
  title: string;
  slug: string;
  createdAt: string;
  excerpt?: string | null;
  content?: { html: string } | null;
  coverImage?: { url: string } | null;
  categories?: { name: string }[];
  author?: { name: string } | null;
}

export interface SimilarPost {
  id: string;
  title: string;
  slug: string;
  createdAt: string;
  excerpt?: string | null;
  coverImage?: { url: string } | null;
  categories?: { name: string }[];
  author?: { name: string } | null;
}
