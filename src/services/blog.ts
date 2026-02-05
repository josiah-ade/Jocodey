import client from "@/lib/hygraph";
import { gql } from "graphql-request";
import {
  BlogDetailPost,
  GetPaginatedPostsResponse,
  Post,
  SimilarPost,
} from "./types/blog";



export async function getPaginatedPosts(page: number = 1, limit: number = 6) {
  const skip = (page - 1) * limit;

  const query = gql`
    query GetPaginatedPosts($skip: Int!, $limit: Int!) {
      posts(orderBy: createdAt_DESC, skip: $skip, first: $limit) {
        id
        title
        slug
        createdAt
        categories {
          name
        }
        author {
          name
        }
        coverImage {
          url
        }
      }
      postsConnection {
        aggregate {
          count
        }
      }
    }
  `;

  try {
    const data = await client.request<GetPaginatedPostsResponse>(query, {
      skip,
      limit,
    });

    return {
      posts: data.posts,
      total: data.postsConnection.aggregate.count,
      page,
      limit,
      totalPages: Math.ceil(data.postsConnection.aggregate.count / limit),
    };
  } catch (error) {
    console.error("GraphQL Error:", error);
    return {
      posts: [],
      total: 0,
      page,
      limit,
      totalPages: 0,
    };
  }
}

// Alternative version with stage parameter (if using Hygraph stages)
export async function getPaginatedPostsWithStage(
  page: number = 1,
  limit: number = 6,
  stage: "DRAFT" | "PUBLISHED" = "PUBLISHED"
) {
  const skip = (page - 1) * limit;

  const query = gql`
    query GetPaginatedPosts($skip: Int!, $limit: Int!, $stage: Stage!) {
      posts(
        orderBy: createdAt_DESC
        skip: $skip
        first: $limit
        stage: $stage
      ) {
        id
        title
        slug
        createdAt
        category {
          name
        }
        author {
          name
        }
        coverImage {
          url
        }
      }
      postsConnection(stage: $stage) {
        aggregate {
          count
        }
      }
    }
  `;

  try {
    const data = await client.request<GetPaginatedPostsResponse>(query, {
      skip,
      limit,
      stage,
    });

    return {
      posts: data.posts,
      total: data.postsConnection.aggregate.count,
      page,
      limit,
      totalPages: Math.ceil(data.postsConnection.aggregate.count / limit),
    };
  } catch (error) {
    console.error("GraphQL Error:", error);
    throw error;
  }
}

export async function getPostBySlug(slug: string) {
  const query = gql`
    query GetPostBySlug($slug: String!) {
      post(where: { slug: $slug }) {
        id
        title
        slug
        createdAt
        content {
          # If you have RichText content
          html
        }
        categories {
          name
        }
        author {
          name
          avatar {
            url
          }
        }
        coverImage {
          url
        }
      }
    }
  `;

  try {
    const data = await client.request<{ post: Post }>(query, { slug });
    return data.post;
  } catch (error) {
    console.error("GraphQL Error (getPostBySlug):", error);
    return null;
  }
}

export async function getPostWithSimilar(slug: string) {
 
  const query = gql`
    query GetPostWithSimilar($slug: String!) {
      post(where: { slug: $slug }) {
        id
        title
        slug
        createdAt
        excerpt
        content {
          html
        }
        coverImage {
          url
        }
        categories {
          name
        }
        author {
          name
        }
      }

      posts(where: { slug_not: $slug }, orderBy: createdAt_DESC, first: 4) {
        id
        title
        slug
        createdAt
        excerpt
        coverImage {
          url
        }
        categories {
          name
        }
        author {
          name
        }
      }
    }
  `;

  try {
    const data = await client.request<{
      post: BlogDetailPost | null;
      posts: SimilarPost[];
    }>(query, { slug }); 

    const post = data.post
      ? {
          id: data.post.id,
          title: data.post.title,
          slug: data.post.slug,
          createdAt: data.post.createdAt,
          excerpt: data.post.excerpt ?? "",
          contents: data.post.content?.html ?? "",
          coverImage: data.post.coverImage?.url ?? "",
          category: data.post.categories?.[0]?.name ?? "Uncategorized",
          author: data.post.author?.name ?? "Admin",
        }
      : null;

    const similarPosts = (data.posts || []).map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      createdAt: p.createdAt,
      excerpt: p.excerpt ?? "",
      coverImage: p.coverImage?.url ?? "",
      category: p.categories?.[0]?.name ?? "Uncategorized",
      author: p.author?.name ?? "Admin",
    }));

    return { post, similarPosts };
  } catch (error) {
    console.error("GraphQL Error (getPostWithSimilar):", error);
    return { post: null, similarPosts: [] };
  }
}
