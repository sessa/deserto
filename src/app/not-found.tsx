import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-purple-50 px-4 text-purple-950">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <Link href="/" className="rounded-lg bg-purple-700 px-4 py-2 font-semibold text-white hover:bg-purple-600">
        Go home
      </Link>
    </div>
  );
}
