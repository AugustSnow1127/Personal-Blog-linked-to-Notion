"use client";

import { useState } from "react";
import Image from "next/image";

interface CommentFormProps {
    currentUser: any;
    onSubmit: (content: string) => Promise<void>;
    isSubmitting: boolean;
}

export default function CommentForm({ currentUser, onSubmit, isSubmitting }: CommentFormProps) {
    const [content, setContent] = useState("");

    const handleInteraction = (e: React.MouseEvent | React.FocusEvent) => {
        if (!currentUser) {
            e.preventDefault();
            // Redirect to login if not authenticated
            window.location.href = "/api/auth/login";
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentUser) {
            window.location.href = "/api/auth/login";
            return;
        }

        if (!content.trim()) return;

        await onSubmit(content);
        setContent("");
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8 flex gap-4">
            <div className="flex-shrink-0 pt-1">
                {currentUser ? (
                    <div className="relative w-10 h-10 rounded-full bg-gray-100 overflow-hidden">
                        {currentUser.user_metadata?.avatar_url ? (
                            <Image
                                src={currentUser.user_metadata.avatar_url}
                                alt={currentUser.user_metadata?.user_name || 'User'}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-500">
                                {currentUser.email?.[0]?.toUpperCase()}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200" />
                )}
            </div>
            <div className="flex-1">
                <div className="relative">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        onClick={handleInteraction}
                        onFocus={handleInteraction}
                        placeholder={currentUser ? "Add to the discussion..." : "Log in to comment..."}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all resize-none min-h-[100px] text-sm"
                        disabled={isSubmitting}
                    />
                    <div className="flex justify-end mt-2">
                        <button
                            type="submit"
                            onClick={handleInteraction}
                            disabled={isSubmitting || !content.trim()}
                            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isSubmitting ? "Posting..." : "Post Comment"}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}
