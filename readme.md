# HQ - API test

Welcome to your backend test for HQ, clone the repository and start by
following the instructions below.

# The goal

Create the necessary endpoints and integrate the existing endpoints in order to create a functional marketplace with the frontend test

## Provisioning your local environment

- Create a new postrges database called `hq_test`
- Copy `.env.example` into `.env`
- Initialize your local database by running `yarn migrate`

If migrate fails you may need to tweak the `.env` file to fit your local
installation of postgres.

## Endpoints to be used

### Product retrieval

`GET` `/vendors/:vendor_id/products`

This endpoint retrieves all of the products for the vendor. Your goal is to call this from the frontend and display all of the results. Ensure you send a valid vendor id in the url to retrieve the correct vendor products

`GET` `/vendors/:vendor_id/fees`

This endpoint retrieves the associated fees for this specific vendor. Upon customer checkout, you would need to call this endpoint and provide the related fees to the customer.

### Checkout

`POST` `/checkout`

This endpoint will take a cart array that contains products, along with
a `vendor_id`, it should have validation to make sure
that the cart items belong to the vendor.

an example payload would look something like - (payload is validated)

P.S. You can hardcode the vendor_id as 1 for the test

`{
    "customer_name": "person test",
    "cart": [
        {
            "id": 1,
            "quantity": 2,
            "vendor_id": 1,
            "price": 1099,
            "delivery_address": {
                "delivery_address_name": "John Doe",
                "delivery_address_line_1": "123 Main Street",
                "delivery_address_line_2": "Suite B",
                "delivery_address_city": "Anytown",
                "delivery_address_state": "California",
                "delivery_address_zip_code": "12345",
                "delivery_address_country": "United States"
            }
        },
        {
            "id": 2,
            "quantity": 5,
            "vendor_id": 1,
            "price": 999,
            "delivery_address": {
                "delivery_address_name": "Alice Smith",
                "delivery_address_line_1": "456 Elm Street",
                "delivery_address_line_2": "",
                "delivery_address_city": "Othertown",
                "delivery_address_state": "New York",
                "delivery_address_zip_code": "54321",
                "delivery_address_country": "United States"
            }
        }
    ]
    "fees":{
        "standard_delivery":1200,
        "processing_fee": 999,
        "service_fee": 399
    }
}`

After validation this endpoint should create the corresponding database
entries in the `orders` - `order_items` - `addresses` tables.
