import { getPosts } from '@/lib/notion';
import PostList from '@/components/PostList';

// Revalidate every 1 hour (same as post detail pages)
export const revalidate = 3600;

export default async function Home() {
  const posts = await getPosts();

  return <PostList posts={posts} />;
}
