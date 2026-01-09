"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

interface CommentSectionProps {
    slug: string;
}

export default function CommentSection({ slug }: CommentSectionProps) {
    // Check if feature is enabled (by checking supabase env vars)
    const isEnabled = !!process.env.NEXT_PUBLIC_SUPABASE_URL;

    const [comments, setComments] = useState<any[]>([]);
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeletingId, setIsDeletingId] = useState<string | null>(null);

    useEffect(() => {
        if (!isEnabled) return;

        const init = async () => {
            await checkUser();
            await fetchComments();
            setIsLoading(false);
        };
        init();
    }, [slug]);

    const checkUser = async () => {
        const supabase = createBrowserClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );
        const { data: { user } } = await supabase.auth.getUser();
        setCurrentUser(user);
    };

    const fetchComments = async () => {
        try {
            const res = await fetch(`/api/posts/${slug}/comments`);
            if (res.ok) {
                const data = await res.json();
                setComments(data);
            }
        } catch (error) {
            console.error("Failed to fetch comments", error);
        }
    };

    const handleCreateComment = async (content: string) => {
        setIsSubmitting(true);
        try {
            const res = await fetch(`/api/posts/${slug}/comments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content }),
            });

            if (!res.ok) throw new Error("Failed to post comment");

            const newComment = await res.json();
            setComments([newComment, ...comments]);
        } catch (error) {
            console.error(error);
            alert("Failed to post comment. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteComment = async (id: string) => {
        if (!confirm("Are you sure you want to delete this comment?")) return;

        setIsDeletingId(id);
        try {
            const res = await fetch(`/api/posts/${slug}/comments?id=${id}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Failed to delete comment");

            setComments(comments.filter(c => c.id !== id));
        } catch (error) {
            console.error(error);
            alert("Failed to delete comment");
        } finally {
            setIsDeletingId(null);
        }
    };

    if (!isEnabled) return null;

    return (
        <div className="py-12 border-t border-gray-100 max-w-2xl">
            <h3 className="text-xl font-bold text-gray-900 mb-8">
                Comments ({comments.length})
            </h3>

            <CommentForm
                currentUser={currentUser}
                onSubmit={handleCreateComment}
                isSubmitting={isSubmitting}
            />

            {isLoading ? (
                <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
            ) : (
                <CommentList
                    comments={comments}
                    currentUserId={currentUser?.id}
                    onDelete={handleDeleteComment}
                    isDeletingId={isDeletingId}
                />
            )}
        </div>
    );
}
