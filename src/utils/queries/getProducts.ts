const getProducts = () => {
  return `SELECT p.*
  FROM products p
    WHERE p.vendor_id = 1
     ;`
}

export default getProducts
