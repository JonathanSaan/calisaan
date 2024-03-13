import products from "../../data/products";

export default defineEventHandler(async (event) => {
  const query = getQuery<{ q: string | undefined, category: string | undefined, price: string | undefined }>(event);
  const priceLabels = ["Under $30.00", "$30.00 - $70.00", "$70.00 - $100.00"];
  console.log(query)
  
  const allProducts = products.map(({ id, name, slug, imageSrc, imageAlt, price, tag }) => ({
    id,
    name,
    slug,
    imageSrc: imageSrc[0],
    imageAlt,
    price,
    tag,
  })).filter((product) => { 
    const searchFilter = product.name.toLowerCase().includes(query.q?.toLowerCase() || "");
  	const categoryFilter = query.category ? product.tag.includes(query.category) : true;
  	const priceFilter = query.price ? getPriceFilter(query.price, product.price) : true;
    
    return searchFilter && categoryFilter && priceFilter;
  });
  
  return allProducts;
})

function getPriceFilter(priceLabel: string, productPrice: string): boolean {
  switch (priceLabel) {
    case "Under $30.00":
      return parseFloat(productPrice) < 30;
    case "$30.00 - $70.00":
      return parseFloat(productPrice) >= 30 && parseFloat(productPrice) < 70;
    case "$70.00 - $100.00":
      return parseFloat(productPrice) >= 70 && parseFloat(productPrice) < 100;
    default:
      return false;
  }
}
