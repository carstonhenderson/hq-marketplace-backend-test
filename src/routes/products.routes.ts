import { Request, Response, Router } from 'express'
import getProducts from '../utils/queries/getProducts'

/**
 * Endpoint to fetch products based on vendor IDs.
 *
 *
 * @route GET /products
 * @param {Request} _req - The Express request object (unused).
 * @param {Response} res - The Express response object.
 * @returns {void}
 *
 * @throws {Error} If there is an error during database query.
 *
 * @example
 * // GET /products
 * // Returns an array of products from vendor 1.
 */

export default function (router: Router, db: any) {
  router.get('/products', async (_req: Request, res: Response) => {
    try {
      const response = await db.query(getProducts())
      res.json(response.rows)
    } catch (error) {
      console.log(error)
      return res.status(500).send(error)
    }
  })
}
