export const dynamic = "force-dynamic";

import { MetadataRoute } from "next";
import { gql } from "graphql-request";
import client from "@/lib/hygraph";

async function getAllPosts() {
  const query = gql`
    query GetAllPosts {
      posts(orderBy: createdAt_DESC, first: 1000) {
        slug
        updatedAt
        coverImage {
          url
        }
      }
    }
  `;

  const data = await client.request<{
    posts: {
      slug: string;
      updatedAt: string;
      coverImage?: { url: string } | null;
    }[];
  }>(query);
  return data.posts;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const posts = await getAllPosts();
  // console.log("POSTS:", posts);

  return [
    // Static pages
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },

    // Blog posts with images
    ...posts.map((post) => ({
      url: `${baseUrl}/blog/details/${post.slug}`,
      lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
      images: post.coverImage?.url ? [post.coverImage.url] : undefined,
    })),
  ];
}
