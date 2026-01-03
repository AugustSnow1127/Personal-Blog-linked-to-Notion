export default function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-auto">
      <div className="max-w-4xl mx-auto px-4 py-6 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} AugustSnow. All rights reserved.</p>
      </div>
    </footer>
  );
}
