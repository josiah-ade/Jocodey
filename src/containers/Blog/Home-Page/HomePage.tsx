import BlogCard from "@/components/Blog/BlogCard";
import Pagination from "@/components/Blog/Pagination";
import { Post } from "@/services/types/blog";
import Link from "next/link";
import React from "react";

interface HomePageProps {
  posts: Post[];
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
    total: number;
  };
}

function HomePage({ posts, pagination }: HomePageProps) {
  const { page, totalPages } = pagination;

  // Generate an array of page numbers [1,2,3,...]
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <section className="blog-section pt-100 pb-100">
      <div className="container mx-auto p-4">
        <div>
          <div className="blog_compo_box">
            <h3>All Stories</h3>
            <p>Every thing you need to know about what we do</p>
          </div>
        </div>

        {/* Grid wrapper */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {posts.map((post, index) => (
            <BlogCard
              key={index}
              slug={post.slug}
              image={post.coverImage?.url || ""}
              category={post.category?.name || ""}
              title={post.title}
              author={post.author?.name || "Admin"}
            />
          ))}
        </div>

        {/* Pagination */}
        <Pagination page={pagination.page} totalPages={pagination.totalPages} />
      </div>
    </section>
  );
}

export default HomePage;
