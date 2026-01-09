import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import LoginButton from "./LoginButton";
import UserAvatar from "./UserAvatar";

export default async function Header() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="">
      <nav className="max-w-4xl mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-900 hover:text-gray-600">
          AugustSnow
        </Link>
        <div className="flex items-center gap-6">
          <ul className="flex gap-6">
            <li>
              <Link href="/" className="text-xs text-gray-600 hover:text-gray-900">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-xs text-gray-600 hover:text-gray-900">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-xs text-gray-600 hover:text-gray-900">
                Contact
              </Link>
            </li>
          </ul>
          {user ? (
            <UserAvatar
              avatarUrl={user.user_metadata.avatar_url}
              userName={user.user_metadata.user_name || user.email || 'User'}
            />
          ) : (
            <LoginButton />
          )}
        </div>
      </nav>
    </header>
  );
}
