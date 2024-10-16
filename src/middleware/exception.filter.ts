/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { injectable } from 'inversify'
import 'reflect-metadata'

import { IExceptionFilter } from '../common/exception.filter.interface'
import Exception from '../common/Exception'

@injectable()
class ExceptionFilter implements IExceptionFilter {
  constructor() {}
  catch(
    err: Error | Exception,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    if (err instanceof Exception) {
      console.error(`[${err.code}]: ${err.message}`)
      res.status(err.code).json({
        message: err.message
      })
    } else {
      console.error(`[${StatusCodes.INTERNAL_SERVER_ERROR}]: ${err.message}`)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: err.message || 'Server Error'
      })
    }
  }
}

export { ExceptionFilter }
