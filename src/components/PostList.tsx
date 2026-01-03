'use client';

import { useState } from 'react';
import { Post } from '@/lib/notion';
import PostCard from './PostCard';
import ViewToggle from './ViewToggle';

interface PostListProps {
  posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  if (posts.length === 0) {
    return <p className="text-gray-500">No posts yet. Create your first post in Notion!</p>;
  }

  return (
    <div>
      <ViewToggle onViewChange={setView} />

      {view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} view="grid" />
          ))}
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} view="list" />
          ))}
        </div>
      )}
    </div>
  );
}
