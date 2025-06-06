
import Link from "next/link";
import React from "react";

export default function BundlePreview({ bundle }) {
  // Use first item's image as preview
  const previewImage = bundle.items[0]?.image || "";

  return (
    <Link href={`/bundles/${bundle.id}`}>
      <a className="block bg-white rounded-2xl shadow overflow-hidden hover:shadow-lg transition-shadow">
        <img src={previewImage} alt={bundle.name} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h2 className="text-lg font-semibold">{bundle.name}</h2>
          <p className="text-sm text-gray-600">{bundle.description}</p>
          <p className="mt-2 font-bold">
            {bundle.totalPrice.toFixed(2)} {bundle.currency}
          </p>
        </div>
      </a>
    </Link>
  );
}
