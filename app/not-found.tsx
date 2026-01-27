import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-200 px-6">
      <div className="text-center max-w-md">
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p className="text-slate-400 mb-6">
          The page you are looking for does not exist or has been moved.
        </p>

        <Link
          href="/"
          className="inline-block bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-md transition"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
