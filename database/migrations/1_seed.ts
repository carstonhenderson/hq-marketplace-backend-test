import { Knex } from 'knex'

const vendors = `
  INSERT INTO vendors (id, name) 
  VALUES 
  (1, 'Aquatic Adventures'),
  (2, 'Mr Bike'),
  (3, 'Ski Co')
`

const products = `
  INSERT INTO products (id, name, price, vendor_id)
  VALUES
  (1, 'Floaties', 5000, 1),
  (2, 'Sunscreen - spray', 1000, 1),
  (3, 'Mountain Bike', 75000, 2),
  (4, 'Training wheels', 2000, 2),
  (5, 'Hamburger', 6500, 3),
  (6, 'Year Pass', 150000, 3),
  (7, 'Donut Floaty', 5000, 1),
  (8, 'Snorkel mask', 1000, 1),
  (9, 'Icee', 75000, 1),
  (10, 'Sandals', 2000, 1),
  (11, 'Phone water protector', 6500, 1),
  (12, 'Sunscreen - lotion', 150000, 1)
`

const vendorFees = `
  INSERT INTO vendor_fees (id, vendor_id, standard_delivery, processing_fee, service_fee)
  VALUES
  (1, 1, 1200, 999, 399),
  (2, 2, 1500, 799, 399),
  (3, 3, 999, 999, 399)
`

export async function up(knex: Knex) {
  return Promise.all([
    knex.raw(vendors),
    knex.raw(products),
    knex.raw(vendorFees),
  ])
}

export async function down() {
  throw new Error('Deprovisioning not supported, reset your database')
}
