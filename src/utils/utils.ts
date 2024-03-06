import validateProduct from './queries/validateProducts'
import registerOrder from './queries/registerOrder'
import registerOrderProducts from './queries/registerOrderItems'
import registerDeliveryAddress from './queries/registerDeliveryAddress'

type orderType = {
  id: number
  customer_name: string
  total: number
}

type orderItemsType = {
  cart: cart[]
  order_id: number
}

export type cart = {
  id: number
  name: string
  price: number
  vendor_id: number
  quantity: number
  delivery_address: deliveryAddress
}

export type deliveryAddress = {
  delivery_address_name: string
  delivery_address_line_1: string
  delivery_address_line_2: string
  delivery_address_city: string
  delivery_address_state: string
  delivery_address_zip_code: string
  delivery_address_country: string
}

/**
 * Validates the items in a cart against the database.
 *
 * This function takes an array of cart items and validates each item against the database.
 * It queries the database to ensure that each item's vendor, and product are valid.
 *
 * @param {cart[]} cart - An array of cart items to be validated.
 * @param {any} db - The database connection or client used for querying.
 * @returns {Promise<boolean>} A Promise that resolves to a boolean indicating whether all items are valid.
 *
 * @throws {Error} If there is an error during validation.
 *
 * @example
 * const cartItems = [
 *   { vendor_id: 1, id: 1001 },
 *   { vendor_id: 2, id: 2002 }
 * ];
 * const dbConnection = // ... establish database connection
 *
 * const isValid = await validateCartItems(cartItems, dbConnection);
 * console.log(isValid); // true if all items are valid, false otherwise
 */

const validateCartItems = async (cart: cart[], db: any) => {
  try {
    const promises: Promise<any>[] = []
    cart.forEach(item => {
      promises.push(db.query(validateProduct(item.vendor_id, item.id)))
    })
    const result = await Promise.all(promises)
    const isValid = validateSQLRowContent(result)
    return isValid
  } catch (error) {
    console.error('Error validating product:', error)
    return false
  }
}

/**
 * Validates the content of SQL query responses.
 *
 * This function validates the content of SQL query responses to ensure that each query
 * contains atleast 1 row in the response
 *
 * @param {any[]} responses - An array of SQL query responses to be validated.
 * @returns {boolean} A boolean indicating whether the given query actually returned a value
 *
 * @example
 * const sqlResponses = [
 *   { rows: [{ id: 1, name: 'Product A' }] },
 *   { rows: [{ id: 2, name: 'Product B' }] }
 * ];
 *
 * const isValid = validateSQLRowContent(sqlResponses);
 * console.log(isValid); // true if all rows have non-empty values, false otherwise
 */

const validateSQLRowContent = (responses: any) => {
  for (const response of responses) {
    if (response.rows && response.rows.length > 0) {
      for (const row of response.rows) {
        const values = Object.values(row)
        const hasEmptyValue = values.some(
          value => value === null || value === undefined || value === ''
        )
        if (hasEmptyValue) {
          return false
        }
      }
    } else {
      return false
    }
  }
  return true
}

/**
 * Registers an order in the database.
 *
 * This function registers an order by inserting order details into the database.
 *
 * @param {orderType} ordertype - An object containing order details including id, customer name, total
 * @param {any} db - The database connection or client used for querying.
 * @returns {Promise<void>} A Promise that resolves when the order is successfully registered.
 *
 * @throws {Error} If there is an error during order registration.
 *
 * @example
 * const orderDetails = {
 *   id: 12345,
 *   customer_name: 'John Doe',
 *   total: 100.50,
 * };
 * const dbConnection = // ... establish database connection
 *
 * await orderRegistration(orderDetails, dbConnection);
 * console.log('Order registered successfully.');
 */

const orderRegistration = async (ordertype: orderType, db: any) => {
  const { id, customer_name, total } = ordertype
  await db.query(registerOrder(+id, customer_name, total))
}

/**
 * Registers order items from a given order in the database.
 *
 * This function registers order items by inserting product details into the database
 * for a specific order item. It iterates through the items in the cart and registers each item.
 *
 * @param {orderItemsType} ordertype - An object containing order item details including order_item_id, order_id, and cart.
 * @param {any} db - The database connection or client used for querying.
 * @returns {Promise<boolean>} A Promise that resolves to a boolean indicating whether the order items were successfully registered.
 *
 * @throws {Error} If there is an error during order item registration.
 *
 * @example
 * const orderItemDetails = {
 *   order_item_id: 123,
 *   order_id: 456,
 *   cart: [
 *     { id: 1001, quantity: 2 },
 *     { id: 2002, quantity: 3 }
 *   ]
 * };
 * const dbConnection = // ... establish database connection
 *
 * const isRegistered = await orderItemRegistration(orderItemDetails, dbConnection);
 * console.log('Order items registered:', isRegistered); // true if registered, false otherwise
 */

const orderItemRegistration = async (ordertype: orderItemsType, db: any) => {
  const original_order_id = ordertype.order_id
  const itemPromises: Promise<any>[] = []
  const addressPromises: Promise<any>[] = []
  try {
    ordertype?.cart?.forEach(async item => {
      const order_item_id = generateOrderID()
      const delivery_address_id = generateOrderID()
      const { id, quantity, delivery_address } = item
      addressPromises.push(
        db.query(registerDeliveryAddress(delivery_address_id, delivery_address))
      )
      itemPromises.push(
        db.query(
          registerOrderProducts(
            order_item_id,
            id,
            quantity,
            original_order_id,
            delivery_address_id
          )
        )
      )
    })
    try {
      await Promise.all(addressPromises)
    } catch (error) {
      console.error('Error inserting addresses:', error)
      return false
    }

    const result = await Promise.all(itemPromises)
    if (result) {
      return true
    }
  } catch (error) {
    console.error('Error validating product:', error)
    return false
  }
}

/**
 * Generates a random 5-digit order ID.
 *
 * This function generates a random 5-digit order ID using numeric characters.
 *
 * @returns {number} A randomly generated 5-digit order ID.
 *
 * @example
 * const orderId = generateOrderID();
 * console.log('Generated Order ID:', orderId); // e.g., 47382
 */

const generateOrderID = (): number => {
  const digits = '0123456789'
  let id = ''

  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * 5)
    id += digits.charAt(randomIndex)
  }

  return Number(id)
}

/**
 * Calculates the total order amount based on items in the cart.
 *
 * This function calculates the total order amount by iterating through the items in the cart.
 * It multiplies the price of each item by its quantity and sums up the individual item totals.
 *
 * @param {cart[]} cart - An array of cart items containing item details including price and quantity.
 * @returns {number} The total order amount based on the items in the cart.
 *
 * @example
 * const cartItems = [
 *   { name: 'Product A', price: 10, quantity: 2 },
 *   { name: 'Product B', price: 20, quantity: 3 }
 * ];
 *
 * const totalAmount = calculateOrderTotal(cartItems);
 * console.log('Total Order Amount:', totalAmount); // e.g., 80 (10*2 + 20*3)
 */

const calculateOrderTotal = (cart: cart[]): number => {
  let orderTotal = 0

  for (const item of cart) {
    if (typeof item.price === 'number') {
      const itemTotal = item.price * item.quantity
      orderTotal += itemTotal
    }
  }
  return orderTotal
}

export {
  validateCartItems,
  orderRegistration,
  generateOrderID,
  orderType,
  calculateOrderTotal,
  orderItemRegistration,
}
