import { Request, Response, NextFunction } from 'express'
import Exception from './Exception'

const errorHandler = (
  error: Exception,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  next(response.status(error.code || 500).json(error.message))
}

export default errorHandler
