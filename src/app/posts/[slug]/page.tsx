import { notFound } from "next/navigation";
import { getPostBySlug, getPageContent, getPosts } from "@/lib/notion";
import NotionRenderer from "@/components/NotionRenderer";
import Link from "next/link";

// Revalidate every 1 hour
export const revalidate = 3600;

// Generate static params for all posts
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title + " | My Blog",
    description: post.summary,
  };
}

import LikeSection from "@/components/LikeSection";
import CommentSection from "@/components/CommentSection";

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const blocks = await getPageContent(post.id);

  return (
    <article>
      <Link
        href="/"
        className="text-blue-600 hover:underline text-sm mb-6 inline-block"
      >
        &larr; Back to posts
      </Link>

      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-gray-500">
          <time dateTime={post.date}>{post.date}</time>
          {post.tags.length > 0 && (
            <div className="flex gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 px-2 py-1 rounded text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      <NotionRenderer blocks={blocks} />

      <LikeSection slug={slug} />
      <CommentSection slug={slug} />
    </article>
  );
}
