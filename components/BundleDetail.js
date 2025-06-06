
import React from "react";

export default function BundleDetail({ bundle, onBuyBundle, onBuyItem }) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{bundle.name}</h1>
      <p className="mb-6 text-gray-700">{bundle.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {bundle.items.map((item, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow p-4 flex flex-col items-center">
            <img src={item.image} alt={item.title} className="w-32 h-32 object-cover rounded mb-4" />
            <h3 className="text-lg font-medium">{item.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{item.storeName}</p>
            <p className="text-md font-semibold mb-4">
              {item.price.toFixed(2)} {item.currency}
            </p>
            <button
              onClick={() => onBuyItem(item)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Buy Item
            </button>
          </div>
        ))}
      </div>

      <div className="text-center">
        <p className="text-xl font-bold mb-4">
          Total: {bundle.totalPrice.toFixed(2)} {bundle.currency}
        </p>
        <button
          onClick={() => onBuyBundle(bundle)}
          className="px-6 py-3 bg-black text-white text-lg rounded hover:bg-gray-800"
        >
          Buy Entire Bundle
        </button>
      </div>
    </div>
  );
}
