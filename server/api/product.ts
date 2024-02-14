import products from "../../data/products";

export default defineEventHandler(async (event) => {
  const { id, slug } = await readBody(event);
  console.log(event)
  
  const product = products.find(product => (id && product.id.toString() === id) || (slug && product.slug === slug));

  if (product) {
    return res.status(200).json(product);
  }
  
  return res.status(404).json({ error: 'Product not found' });
});
