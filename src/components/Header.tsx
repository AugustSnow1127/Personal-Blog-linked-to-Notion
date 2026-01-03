import Link from "next/link";

export default function Header() {
  return (
    <header className="">
      <nav className="max-w-4xl mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-900 hover:text-gray-600">
          AugustSnow
        </Link>
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
      </nav>
    </header>
  );
}
