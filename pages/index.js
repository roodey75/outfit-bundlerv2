
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-white">
      <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512436991641-6745cdb1723f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')" }}>
        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg mb-6">Curated Outfit Bundles</h1>
        <p className="text-xl text-white drop-shadow mb-8 max-w-xl text-center">
          Never worry about what to wear again. Explore our handpicked collections from top brands.
        </p>
        <Link href="/bundles">
          <a className="px-6 py-3 bg-black text-white text-lg font-semibold rounded hover:bg-gray-800">
            Browse Bundles
          </a>
        </Link>
      </div>
    </div>
  );
}
