const registerOrder = (
  order_id: number,
  customerName: string,
  total: number
) => {
  return `INSERT INTO orders(
	id, customer_name, total)
	VALUES (${order_id},'${customerName}',${total});`
}

export default registerOrder
