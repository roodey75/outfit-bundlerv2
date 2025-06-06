
import { bundles } from "../../lib/bundles";
import BundleDetail from "../../components/BundleDetail";
import { useState } from "react";

export async function getStaticPaths() {
  const paths = bundles.map((b) => ({ params: { id: b.id } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const bundle = bundles.find((b) => b.id === params.id);
  const totalPrice = bundle.items.reduce((sum, i) => sum + i.price, 0);
  return { props: { bundle: { ...bundle, totalPrice } } };
}

export default function BundlePage({ bundle }) {
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

  function handleBuyBundle() {
    createCheckout(bundle.items);
  }

  function handleBuyItem(item) {
    createCheckout([{ variantId: item.variantId, quantity: item.quantity }]);
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {error && <p className="text-red-600 text-center mt-4">{error}</p>}
      <BundleDetail
        bundle={bundle}
        onBuyBundle={handleBuyBundle}
        onBuyItem={handleBuyItem}
      />
    </div>
  );
}
