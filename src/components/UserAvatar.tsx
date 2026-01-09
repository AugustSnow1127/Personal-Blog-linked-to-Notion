'use client'

import { useState } from 'react'
import Image from 'next/image'

interface UserAvatarProps {
    avatarUrl: string
    userName: string
}

export default function UserAvatar({ avatarUrl, userName }: UserAvatarProps) {
    const [isOpen, setIsOpen] = useState(false)

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' })
        window.location.href = '/'
    }

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-full"
            >
                <Image
                    src={avatarUrl}
                    alt={userName}
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-gray-200 hover:border-gray-400 transition-colors"
                />
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                        <div className="px-4 py-2 border-b border-gray-200">
                            <p className="text-sm font-medium text-gray-900">{userName}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}
