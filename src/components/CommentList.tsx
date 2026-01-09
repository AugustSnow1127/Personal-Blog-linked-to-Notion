"use client";

import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

interface Comment {
    id: string;
    user_id: string;
    user_name: string;
    avatar_url?: string;
    content: string;
    created_at: string;
}

interface CommentListProps {
    comments: Comment[];
    currentUserId?: string;
    onDelete: (id: string) => Promise<void>;
    isDeletingId: string | null;
}

export default function CommentList({ comments, currentUserId, onDelete, isDeletingId }: CommentListProps) {
    if (comments.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500 text-sm">
                No comments yet. Be the first to share your thoughts!
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {comments.map((comment) => (
                <div key={comment.id} className="flex gap-4 group">
                    <div className="flex-shrink-0">
                        <div className="relative w-10 h-10 rounded-full bg-gray-100 overflow-hidden">
                            {comment.avatar_url ? (
                                <Image
                                    src={comment.avatar_url}
                                    alt={comment.user_name}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-lg text-gray-400">
                                    {comment.user_name?.[0]?.toUpperCase() || '?'}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-gray-900 text-sm">
                                    {comment.user_name}
                                </span>
                                <span className="text-xs text-gray-400">
                                    {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                                </span>
                            </div>
                            {currentUserId === comment.user_id && (
                                <button
                                    onClick={() => onDelete(comment.id)}
                                    disabled={isDeletingId === comment.id}
                                    className="text-gray-400 hover:text-red-500 text-xs opacity-0 group-hover:opacity-100 transition-all font-medium"
                                >
                                    {isDeletingId === comment.id ? "Deleting..." : "Delete"}
                                </button>
                            )}
                        </div>
                        <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap break-words">
                            {comment.content}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
