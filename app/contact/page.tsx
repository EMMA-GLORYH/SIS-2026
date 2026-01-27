"use client";

import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-4xl font-bold mb-6 text-[#002147]">Contact Us</h1>
      <p className="text-lg text-gray-700 mb-6 text-center max-w-xl">
        Have questions or want to request our services? Reach out to us using the form below or via email.
      </p>
      <Link
        href="/service-request"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
      >
        Submit a Service Request
      </Link>
    </main>
  );
}
