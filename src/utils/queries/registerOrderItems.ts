const registerOrderItems = (
  id: number,
  product_id: number,
  quantity: number,
  order_id: number,
  address_id: number
) => {
  return `INSERT INTO order_items(
    id, product_id, quantity, order_id, delivery_address_id)
    VALUES (${id}, ${product_id}, ${quantity}, ${order_id}, ${address_id});`
}

export default registerOrderItems
