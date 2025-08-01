import Link from "next/link";

export default function Home() {
  return (
    <div className=" mt-40 p-8 max-w-max mx-auto space-y-4 flex flex-col items-center">
      <nav className="flex space-x-4 text-white text-2xl">
        <Link
          href="/"
          className="px-3 py-1 bg-[#698aab] rounded hover:bg-gray-300"
        >
          Home
        </Link>
        <Link
          href="/dashboard"
          className="px-3 py-1 bg-[#3b7960] rounded hover:bg-blue-300"
        >
          Dashboard
        </Link>
        <Link
          href="/login"
          className="px-3 py-1 bg-[#165e83] rounded hover:bg-green-300"
        >
          Sign In
        </Link>
        <Link
          href="/signup"
          className="px-3 py-1 bg-[#69821b] rounded hover:bg-purple-300"
        >
          Sign Up
        </Link>
      </nav>

      <h1 className=" mt-20 text-3xl font-bold text-center text-[#4c6473]">
        Welcome to my security testing home page!
      </h1>
    </div>
  );
}
