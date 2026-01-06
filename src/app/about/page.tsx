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
          28 歲軟體工程師，喜歡研究別人的商業模式，也喜歡開發 SaaS 產品。
        </p>

        <p className="text-sm text-gray-600 mb-4">
          興趣是閱讀、寫作、youtube、聽podcast、動漫、追劇。總之只要能透過任何管道理解別人獨特的思想都覺得很有趣。
        </p>

        <p className="text-sm text-gray-600 mb-4">
          目標是 Productize myself，並走上 Pathless Path，讓自己在這個世界獨一無二。
        </p>
      </div>
    </div>
  );
}
