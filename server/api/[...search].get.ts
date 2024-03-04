import products from "../../data/products";

export default defineEventHandler(async (event) => {
  const { q } = getQuery(event)
  
  const allProducts = products.map(({ id, name, slug, imageSrc, imageAlt, price }) => ({
    id,
    name,
    slug,
    imageSrc: imageSrc[0],
    imageAlt,
    price,
  }));
  
  if (!q) {
    return allProducts;
  }
  
  const searchResults = allProducts.filter(product => {
    return (
      product.name.toLowerCase().includes(q.toLowerCase()) ||
      product.slug.toLowerCase().includes(q.toLowerCase())
    );
  });

  return searchResults;
})
