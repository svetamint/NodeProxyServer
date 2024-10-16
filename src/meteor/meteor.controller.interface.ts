import { Request, Response, NextFunction, Router } from 'express'

interface IMeteorController {
  router: Router
  findAll: (req: Request, res: Response, next: NextFunction) => void
}

export { IMeteorController }
