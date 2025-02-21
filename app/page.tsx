import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to Article App</h1>
      <p className="text-lg text-gray-600 mb-4">
        Explore the latest articles curated just for you.
      </p>
      <Link href="/Signup" className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300">
        View Articles
      </Link>
    </main>
  );
}
