import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/lib/notion';
import Avatar from './Avatar';
import ImagePlaceholder from './ImagePlaceholder';

interface PostCardProps {
  post: Post;
  view: 'grid' | 'list';
}

export default function PostCard({ post, view }: PostCardProps) {
  if (view === 'grid') {
    return (
      <Link href={'/posts/' + post.slug} className="group block h-full">
        <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
          {/* 上方 50%：封面圖 */}
          <div className="relative w-full aspect-video bg-gray-100">
            {post.cover ? (
              <Image
                src={post.cover}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            ) : (
              <ImagePlaceholder />
            )}
          </div>

          {/* 下方 50%：內容 */}
          <div className="p-4 flex flex-col flex-1 justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600">
                {post.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-3 mb-8">
                {post.summary}
              </p>
            </div>

            {/* 底部：日期 + 頭像 */}
            <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100">
              <time className="text-xs text-gray-500" dateTime={post.date}>
                {post.date}
              </time>
              <Avatar size="sm" />
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // List 模式：保留原有樣式
  return (
    <article className="border-b border-gray-100 py-6 last:border-b-0">
      <Link href={'/posts/' + post.slug} className="group">
        <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 mb-2">
          {post.title}
        </h2>
        <p className="text-gray-600 mb-3">{post.summary}</p>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <time dateTime={post.date}>{post.date}</time>
          {post.tags.length > 0 && (
            <div className="flex gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="bg-gray-100 px-2 py-1 rounded text-xs">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
