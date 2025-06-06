
import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav className="bg-white shadow">
      <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/">
          <a className="text-xl font-bold">Outfit Bundler</a>
        </Link>
        <Link href="/bundles">
          <a className="px-3 py-1 rounded bg-black text-white hover:bg-gray-800">View Bundles</a>
        </Link>
      </div>
    </nav>
  );
}
