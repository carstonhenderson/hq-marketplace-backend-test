//This middleware checks that received payload matches the expected schema

import { Handler } from 'express'

const checkoutPayloadValidation: Handler = async (req, res, next) => {
  const payload = req.body
  const { customer_name, cart, fees } = payload

  // Check if customer_name and cart exist in the payload
  if (!customer_name || !cart || !fees) {
    return res.status(500).json({ error: 'Payload is missing required fields' })
  }

  // Check if cart is an array and each item has the required properties
  if (
    !Array.isArray(cart) ||
    cart.length < 2 ||
    !cart.every(item => {
      return (
        'id' in item &&
        'quantity' in item &&
        'vendor_id' in item &&
        'price' in item &&
        'delivery_address' in item &&
        typeof item.delivery_address === 'object' &&
        'delivery_address_name' in item.delivery_address &&
        'delivery_address_line_1' in item.delivery_address &&
        'delivery_address_city' in item.delivery_address &&
        'delivery_address_state' in item.delivery_address &&
        'delivery_address_zip_code' in item.delivery_address &&
        'delivery_address_country' in item.delivery_address
      )
    })
  ) {
    return res.status(500).json({ error: 'Invalid cart items' })
  }

  // If payload is valid, proceed to the next middleware or route handler
  next()
}

export { checkoutPayloadValidation }
