import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | My Blog",
  description: "Get in touch with me",
};

export default function ContactPage() {
  return (
    <div>
      <div className="prose prose-gray max-w-none">
        <p className="text-sm text-gray-600 mb-6">
          既然你都點進來就連絡我來個 coffee chat 吧！ 雖然我很I人但我想多認識志同道合的人 :D
        </p>

        <ul className="space-y-3 text-gray-600">
          {/* TODO: Add your actual contact information */}
          <li>
            <strong>Email:</strong>{" "}
            <a href="mailto:angusqweas@gmail.com" className="text-blue-600 hover:underline">
              angusqweas@gmail.com
            </a>
          </li>
          <li>
            <strong>X:</strong>{" "}
            <a
              href="https://x.com/AngusChang1127"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              https://x.com/AngusChang1127
            </a>
          </li>
          <li>
            <strong>GitHub:</strong>{" "}
            <a
              href="https://github.com/AugustSnow1127"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              https://github.com/AugustSnow1127
            </a>
          </li>
          <li>
            <strong>LinkedIn:</strong>{" "}
            <a
              href="https://www.linkedin.com/in/augustsnow1127/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              https://www.linkedin.com/in/augustsnow1127/
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
