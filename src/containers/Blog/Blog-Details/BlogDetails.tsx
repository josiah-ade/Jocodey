"use client";

import BlogMain from "./Sections/BlogMain";
import BlogSidebar from "./Sections/BlogSidebar";

interface BlogDetailsProps {
  post: {
    title: string;
    author: string;
    contents: string;
    category: string;
    coverImage: string;
  };
  similarPosts: {
    title: string;
    category: string;
    author: string;
    slug: string;
    coverImage: string;
  }[];
}

export default function BlogDetails({ post, similarPosts }: BlogDetailsProps) {
  return (
    <section className="blog-details-area ptb-100">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <BlogMain post={post} />
          <BlogSidebar similarPosts={similarPosts} />
        </div>
      </div>
    </section>
  );
}
