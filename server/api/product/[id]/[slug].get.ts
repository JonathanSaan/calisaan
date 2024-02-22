import products from "../../../../data/products";

export default defineEventHandler(async (event) => {
  const requestId = event.context.params?.id || 0;
  const requestSlug = event.context.params?.slug || null;
  
  const product = products.find(product => 
    (requestId && product.id.toString() === requestId) && 
    (requestSlug && product.slug === requestSlug)
  );
  
  const similarProducts = products
    .filter(p => p.id !== product.id && p.tag.some(tag => product.tag.includes(tag)))
    .map(({ id, name, slug, imageSrc, imageAlt, price }) => ({
      id,
      name,
      slug,
      imageSrc,
      imageAlt,
      price,
    }));

  product.similarProducts = similarProducts;

  return product;
});
