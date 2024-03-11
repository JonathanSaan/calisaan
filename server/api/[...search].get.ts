import products from "../../data/products";

export default defineEventHandler(async (event) => {
  const query = getQuery<{ q: string | undefined }>(event);
  const allProducts = products.map(({ id, name, slug, imageSrc, imageAlt, price }) => ({
    id,
    name,
    slug,
    imageSrc: imageSrc[0],
    imageAlt,
    price,
  })).filter((product) => product.name.toLowerCase().includes(query.q?.toLowerCase() || ""));
  
  return allProducts;
})
