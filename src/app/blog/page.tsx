import HomePage from "@/containers/Blog/Home-Page/HomePage";
import { getPaginatedPosts } from "@/services/blog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const data = await getPaginatedPosts(currentPage, 20);

  return <HomePage posts={data.posts} pagination={data} />;
}
