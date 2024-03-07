import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('vendors', table => {
    table.integer('id').primary()
    table.text('name').notNullable()
  })

  await knex.schema.createTable('addresses', table => {
    table.integer('id').primary()
    table.text('delivery_name').notNullable()
    table.text('delivery_address_line_1').notNullable()
    table.text('delivery_address_line_2')
    table.text('delivery_address_city').notNullable()
    table.text('delivery_address_state').notNullable()
    table.text('delivery_address_zip_code').notNullable()
    table.text('delivery_address_country').notNullable()
  })

  await knex.schema.createTable('vendor_fees', table => {
    table.integer('id').primary()
    table.text('vendor_id').notNullable()
    table.integer('standard_delivery').notNullable() // cents
    table.integer('processing_fee').notNullable() // cents
    table.integer('service_fee').notNullable() // cents
  })

  await knex.schema.createTable('products', table => {
    table.integer('id').primary()
    table.text('name').notNullable()
    table.integer('price').notNullable() // cents
    table.integer('vendor_id').references('vendors.id')
  })

  await knex.schema.createTable('orders', table => {
    table.integer('id').primary()
    table.text('customer_name').notNullable()
    table.integer('total').notNullable() // cents
  })

  await knex.schema.createTable('order_items', table => {
    table.integer('id').primary()
    table.integer('product_id').references('products.id')
    table.integer('quantity').notNullable()
    table.integer('order_id').references('orders.id')
    table.integer('delivery_address_id').references('addresses.id')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('order_items')
  await knex.schema.dropTable('orders')
  await knex.schema.dropTable('products')
  await knex.schema.dropTable('vendors')
  await knex.schema.dropTable('vendor_fees')
  await knex.schema.dropTable('addresses')
}
