import BlogDetails from "@/containers/Blog/Blog-Details/BlogDetails";
import { getExcerptFromHtml } from "@/lib/excerpt";
import { getCanonicalForBlog } from "@/lib/seo";
import { getPostWithSimilar } from "@/services/blog";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const blogId = await params;
  const { post } = await getPostWithSimilar(blogId.id);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  if (!post) {
    return {
      title: "Post Not Found - Jocodey",
      description: "The blog post you are looking for does not exist.",
    };
  }

  return {
    title: post.title,
    description: post.excerpt || getExcerptFromHtml(post.contents, 160),
    alternates: {
      canonical: getCanonicalForBlog(post.slug),
    },
    openGraph: {
      title: post.title,
      description: post.excerpt || getExcerptFromHtml(post.contents, 160),
      url: `${siteUrl}/blog/details/${post.slug}`,
      type: "article",
      images: post.coverImage
        ? [
            {
              url: post.coverImage,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || getExcerptFromHtml(post.contents, 160),
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function BlogPageDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const blogId = await params;
  const { post, similarPosts } = await getPostWithSimilar(blogId.id);

  if (!post) {
    return redirect("/blog");
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // JSON-LD structured data for blog post
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || getExcerptFromHtml(post.contents, 160),
    image: post.coverImage ? [post.coverImage] : [],
    author: {
      "@type": "Person",
      name: post.author || "Admin",
    },
    datePublished: post.createdAt,
    dateModified: post.createdAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/details/${post.slug}`,
    },
  };

  return (
    <>
      {/* Inject structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <BlogDetails post={post} similarPosts={similarPosts} />
    </>
  );
}
