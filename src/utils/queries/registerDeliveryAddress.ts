import { deliveryAddress } from '../utils'
const registerDeliveryAddress = (
  id: number,
  deliveryAddress: deliveryAddress
) => {
  return `INSERT INTO addresses(
      id,
      delivery_name,
      delivery_address_line_1,
      delivery_address_line_2,
      delivery_address_city,
      delivery_address_state,
      delivery_address_zip_code,
      delivery_address_country)
      VALUES (${id}, '${deliveryAddress.delivery_address_name}', '${deliveryAddress.delivery_address_line_1}', '${deliveryAddress.delivery_address_line_2}', '${deliveryAddress.delivery_address_city}', '${deliveryAddress.delivery_address_state}', '${deliveryAddress.delivery_address_zip_code}', '${deliveryAddress.delivery_address_country}');`
}

export default registerDeliveryAddress
