"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import LikeButton from "./LikeButton";

export default function LikeSection({ slug }: { slug: string }) {
    const [mounted, setMounted] = useState(false);
    const [liked, setLiked] = useState(false);
    const [count, setCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState<any>(null);

    useEffect(() => {
        setMounted(true);
        fetchLikes();
        checkUser();
    }, [slug]);

    const checkUser = async () => {
        const supabase = createBrowserClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );
        const { data: { user } } = await supabase.auth.getUser();
        setCurrentUser(user);
    };

    const fetchLikes = async () => {
        try {
            const res = await fetch(`/api/posts/${slug}/likes`);
            const data = await res.json();
            if (res.ok) {
                setCount(data.count || 0);
                setLiked(data.userLiked);
            }
        } catch (error) {
            console.error("Failed to fetch likes:", error);
        }
    };

    const handleToggleLike = async () => {
        if (!currentUser) {
            window.location.href = "/api/auth/login";
            return;
        }

        setIsLoading(true);
        // Optimistic update
        const previousLiked = liked;
        const previousCount = count;

        setLiked(!liked);
        setCount(liked ? count - 1 : count + 1);

        try {
            const method = previousLiked ? "DELETE" : "POST";
            const res = await fetch(`/api/posts/${slug}/likes`, {
                method,
            });

            if (!res.ok) {
                throw new Error("Failed to update like");
            }

            // Refresh to get server state
            fetchLikes();
        } catch (error) {
            // Revert on error
            setLiked(previousLiked);
            setCount(previousCount);
            console.error(error);
            alert("Failed to update like status");
        } finally {
            setIsLoading(false);
        }
    };

    if (!mounted) return null;

    return (
        <div className="flex items-center gap-4 py-8 border-t border-gray-100 mt-8">
            <LikeButton
                liked={liked}
                likesCount={count}
                onToggle={handleToggleLike}
                isLoading={isLoading}
            />
        </div>
    );
}
