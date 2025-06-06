
import { shopifyRequest } from "../../lib/shopify";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { items } = req.body;
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "No items provided" });
  }

  const lineItems = items.map((item) => ({
    variantId: item.variantId,
    quantity: item.quantity || 1,
  }));

  const mutation = `
    mutation checkoutCreate($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          id
          webUrl
        }
        userErrors {
          field
          message
          code
        }
      }
    }
  `;

  const variables = { input: { lineItems } };

  try {
    const data = await shopifyRequest(mutation, variables);
    const checkoutCreate = data.checkoutCreate;
    if (checkoutCreate.userErrors.length > 0) {
      console.error("Shopify user errors:", checkoutCreate.userErrors);
      return res.status(500).json({ error: "User errors creating checkout" });
    }
    const checkoutUrl = checkoutCreate.checkout.webUrl;
    return res.status(200).json({ checkoutUrl });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to create checkout" });
  }
}
