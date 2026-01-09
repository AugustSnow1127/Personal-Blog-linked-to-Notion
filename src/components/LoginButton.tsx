'use client'

export default function LoginButton() {
    const handleLogin = () => {
        window.location.href = '/login'
    }

    return (
        <button
            onClick={handleLogin}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-700 transition-colors"
        >
            Login
        </button>
    )
}
