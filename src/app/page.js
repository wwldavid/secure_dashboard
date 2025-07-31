import Link from "next/link";

export default function Home() {
  return (
    <div className=" mt-40 p-8 max-w-md mx-auto space-y-4">
      <nav className="flex space-x-4">
        <Link
          href="/"
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Home
        </Link>
        <Link
          href="/dashboard"
          className="px-3 py-1 bg-blue-200 rounded hover:bg-blue-300"
        >
          Dashboard
        </Link>
        <Link
          href="/login"
          className="px-3 py-1 bg-green-200 rounded hover:bg-green-300"
        >
          Sign In
        </Link>
        <Link
          href="/signup"
          className="px-3 py-1 bg-purple-200 rounded hover:bg-purple-300"
        >
          Sign Up
        </Link>
      </nav>

      <h1 className=" mt-20 text-3xl font-bold text-center text-[#69b076]">
        Welcome to my security home page!
      </h1>
    </div>
  );
}
