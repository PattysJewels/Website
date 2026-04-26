const domain = import.meta.env.SHOPIFY_STORE_DOMAIN;
const token = import.meta.env.SHOPIFY_STOREFRONT_TOKEN;
const endpoint = `https://${domain}/api/2025-01/graphql.json`;

async function shopifyFetch(query: string) {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) throw new Error(`Shopify fetch failed: ${res.status}`);
  return res.json();
}

export type ShopifyProduct = {
  id: string;
  title: string;
  handle: string;
  description: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: { node: { url: string; altText: string | null } }[];
  };
  variants: {
    edges: {
      node: {
        id: string;
        price: { amount: string; currencyCode: string };
        availableForSale: boolean;
      };
    }[];
  };
};

const PRODUCTS_QUERY = `
  query Products {
    products(first: 50, sortKey: CREATED_AT, reverse: true) {
      edges {
        node {
          id
          title
          handle
          description
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                price {
                  amount
                  currencyCode
                }
                availableForSale
              }
            }
          }
        }
      }
    }
  }
`;

export async function getProducts(): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch(PRODUCTS_QUERY);
  return data.data.products.edges.map(
    (edge: { node: ShopifyProduct }) => edge.node
  );
}
