
import React from "react";

export default function BundleCard({ bundle, onBuyBundle, onBuyItem }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-semibold mb-2">{bundle.name}</h2>
        <p className="mb-4 text-sm text-gray-600">{bundle.description}</p>

        <ul className="space-y-4 mb-4">
          {bundle.items.map((item, idx) => (
            <li
              key={idx}
              className="flex items-center justify-between border-b pb-3"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-12 h-12 rounded object-cover"
                />
                <div>
                  <p className="text-gray-800 font-medium">{item.title}</p>
                  <p className="text-sm text-gray-600">
                    {item.storeName} • {item.price.toFixed(2)} {item.currency}
                  </p>
                </div>
              </div>
              <button
                onClick={() => onBuyItem(item)}
                className="px-3 py-1 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
              >
                Buy Item
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-lg font-bold">
          {bundle.totalPrice.toFixed(2)} {bundle.currency}
        </span>
        <button
          onClick={() => onBuyBundle(bundle)}
          className="px-4 py-2 rounded bg-black text-white hover:bg-gray-800"
        >
          Buy Bundle
        </button>
      </div>
    </div>
  );
}
