import products from "../../../../data/products";

export default defineEventHandler(async (event) => {
  const { id, slug } = event.context.params;
  
  const product = products.find(product => 
    (id && product.id.toString() === id) && 
    (slug && product.slug === slug)
  );
  
  const similarProducts = products
    .filter(p => p.id !== product.id && p.tag.some(tag => product.tag.includes(tag)))
    .map(({ id, name, slug, imageSrc, imageAlt, price }) => ({
      id,
      name,
      slug,
      imageSrc: imageSrc[0],
      imageAlt,
      price,
    }));
  
  return { ...product, similarProducts };
});
