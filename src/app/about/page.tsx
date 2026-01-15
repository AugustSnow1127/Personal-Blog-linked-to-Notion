import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | My Blog",
  description: "Learn more about me",
};

export default function AboutPage() {
  return (
    <div>
      <div className="prose prose-gray max-w-none">
        <p className="text-sm text-gray-600 mb-4">
          軟體工程師，喜歡創業和開發 SaaS 產品。
        </p>

        <p className="text-sm text-gray-600 mb-4">
          興趣是閱讀、寫作、youtube、動漫、追劇。理解別人獨特的思想總是很有趣。
        </p>

        <p className="text-sm text-gray-600 mb-4">
          目標是 Productize myself，讓自己在這個世界獨一無二。
        </p>
      </div>
    </div>
  );
}
