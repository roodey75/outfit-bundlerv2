
import { useState } from "react";
import BundleCard from "../components/BundleCard";

export default function Home() {
  const bundles = [
    {
      id: "bundle1",
      name: "Old-Money Elegance",
      description: "Beige chinos, white Oxford shirt, leather loafers, brown belt.",
      currency: "EUR",
      items: [
        {
          variantId: "gid://shopify/ProductVariant/1234567890abcdef",
          quantity: 1,
          title: "Beige Chinos",
          storeName: "Zara",
          price: 49.99,
          image: "https://static.zara.net/photos/2025/SOMEPATH/beige_chinos.jpg",
        },
        {
          variantId: "gid://shopify/ProductVariant/abcdef1234567890",
          quantity: 1,
          title: "White Oxford Shirt",
          storeName: "H&M",
          price: 39.99,
          image: "https://static.hm.com/photos/2025/ShirtWhite.jpg",
        },
        {
          variantId: "gid://shopify/ProductVariant/0987654321fedcba",
          quantity: 1,
          title: "Leather Loafers",
          storeName: "Zalando",
          price: 79.99,
          image: "https://static.zalando.net/photos/2025/LoafersLeather.jpg",
        },
        {
          variantId: "gid://shopify/ProductVariant/fedcba0987654321",
          quantity: 1,
          title: "Brown Belt",
          storeName: "H&M",
          price: 19.99,
          image: "https://static.hm.com/photos/2025/BeltBrownLeather.jpg",
        },
      ],
    },
    {
      id: "bundle2",
      name: "Urban Streetwear",
      description: "Oversized hoodie, ripped jeans, high-top sneakers, chain.",
      currency: "EUR",
      items: [
        {
          variantId: "gid://shopify/ProductVariant/1111222233334444",
          quantity: 1,
          title: "Oversized Hoodie",
          storeName: "Pull&Bear",
          price: 59.99,
          image: "https://static.pullandbear.com/photos/2025/hoodie.jpg",
        },
        {
          variantId: "gid://shopify/ProductVariant/5555666677778888",
          quantity: 1,
          title: "Ripped Jeans",
          storeName: "Bershka",
          price: 49.99,
          image: "https://static.bershka.com/photos/2025/ripped_jeans.jpg",
        },
        {
          variantId: "gid://shopify/ProductVariant/99990000aaaa1111",
          quantity: 1,
          title: "High-Top Sneakers",
          storeName: "Zalando",
          price: 69.99,
          image: "https://static.zalando.net/photos/2025/SneakersHighTop.jpg",
        },
      ],
    },
  ];

  bundles.forEach((b) => {
    b.totalPrice = b.items.reduce((sum, i) => sum + i.price, 0);
  });

  const [loadingBundleId, setLoadingBundleId] = useState(null);
  const [loadingItemId, setLoadingItemId] = useState(null);
  const [error, setError] = useState(null);

  async function createCheckout(items) {
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      window.location.href = data.checkoutUrl;
    } catch (err) {
      console.error(err);
      setError("Failed to create checkout. Please try again.");
    }
  }

  async function handleBuyBundle(bundle) {
    setLoadingBundleId(bundle.id);
    await createCheckout(bundle.items);
    setLoadingBundleId(null);
  }

  async function handleBuyItem(item) {
    setLoadingItemId(item.variantId);
    await createCheckout([{ variantId: item.variantId, quantity: item.quantity }]);
    setLoadingItemId(null);
  }

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Outfit Bundles</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bundles.map((bundle) => (
          <BundleCard
            key={bundle.id}
            bundle={bundle}
            onBuyBundle={() => handleBuyBundle(bundle)}
            onBuyItem={(item) => handleBuyItem(item)}
          />
        ))}
      </div>
    </div>
  );
}
