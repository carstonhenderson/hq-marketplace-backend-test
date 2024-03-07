const validateProduct = (vendor_id: number, product_id: number) => {
  return `SELECT p.*
  FROM products p
  JOIN vendors v ON p.vendor_id = v.id
  WHERE v.id = ${vendor_id} AND p.id = ${product_id}`
}

export default validateProduct
