import path from 'path'
import glob from 'glob'
import { Router } from 'express'

const router = (db: unknown): Router => {
  const router = Router()

  const dir = path.resolve(__dirname, '..')
  const routes = glob.sync(`${dir}/**/*.routes.ts`)
  routes.forEach(file => {
    import(file).then(module => module.default(router, db))
  })

  return router
}

export default router
