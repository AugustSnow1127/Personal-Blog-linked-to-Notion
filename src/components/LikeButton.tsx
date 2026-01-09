"use client";

interface LikeButtonProps {
    liked: boolean;
    likesCount: number;
    onToggle: () => void;
    isLoading?: boolean;
}

export default function LikeButton({ liked, likesCount, onToggle, isLoading = false }: LikeButtonProps) {
    return (
        <button
            onClick={onToggle}
            disabled={isLoading}
            className={`
        flex items-center gap-2 px-4 py-2 rounded-full transition-all border
        ${liked
                    ? 'bg-blue-50 border-blue-200 text-blue-600'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                }
      `}
        >
            <span className="text-lg">👍</span>
            <span className="font-medium text-sm">
                {likesCount > 0 ? likesCount : 'Like'}
            </span>
        </button>
    );
}
