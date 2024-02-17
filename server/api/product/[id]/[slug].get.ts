import products from "../../../../data/products";

export default defineEventHandler(async (event) => {
  const requestId = event.context.params?.id || 0;
  const requestSlug = event.context.params?.slug || null;
  
  const product = products.find(product => (requestId && product.id.toString() === requestId) && (requestSlug && product.slug === requestSlug));

  return product;
});
