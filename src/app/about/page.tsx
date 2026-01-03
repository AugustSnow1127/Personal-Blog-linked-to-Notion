import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | My Blog",
  description: "Learn more about me",
};

export default function AboutPage() {
  return (
    <div>
      <div className="prose prose-gray max-w-none">
        <p className="text-lg text-gray-600 mb-4">
          Welcome to my personal blog! This is where I share my thoughts,
          experiences, and daily musings.
        </p>

        <p className="text-gray-600 mb-4">
          {/* TODO: Add your personal introduction here */}
          Feel free to explore my posts and get to know me better through my writing.
        </p>
      </div>
    </div>
  );
}
