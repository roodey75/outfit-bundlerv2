
import { bundles } from "../../lib/bundles";
import BundlePreview from "../../components/BundlePreview";

export async function getStaticProps() {
  // Precompute totalPrice for each bundle
  const enriched = bundles.map((b) => {
    const totalPrice = b.items.reduce((sum, i) => sum + i.price, 0);
    return { ...b, totalPrice };
  });
  return { props: { bundles: enriched } };
}

export default function BundlesPage({ bundles }) {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Our Bundles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bundles.map((bundle) => (
          <BundlePreview key={bundle.id} bundle={bundle} />
        ))}
      </div>
    </div>
  );
}
