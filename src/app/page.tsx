import { getPosts } from '@/lib/notion';
import PostList from '@/components/PostList';

export default async function Home() {
  const posts = await getPosts();

  return <PostList posts={posts} />;
}
