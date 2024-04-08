import { Request, Response, Router } from 'express'
import getVendorFees from '../utils/queries/getVendorFees'

/**
 * Endpoint to fetch related vendor fees based on vendor IDs.
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
 * // GET /vendors/:vendor_id/fees
 * // Returns an array of products from vendor 1.
 */

export default function (router: Router, db: any) {
  router.get(
    '/vendors/:vendor_id/fees',
    async (_req: Request, res: Response) => {
      try {
        const response = await db.query(getVendorFees(_req.params.vendor_id))
        res.json(response.rows[0])
      } catch (error) {
        console.log(error)
        return res.status(500).send(error)
      }
    }
  )
}
