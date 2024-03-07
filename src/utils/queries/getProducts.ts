const getProducts = (vendor_id: string) => {
  return `SELECT p.*
  FROM products p
    WHERE p.vendor_id = ${vendor_id}
     ;`
}

export default getProducts
