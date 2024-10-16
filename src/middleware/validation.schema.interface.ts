import { ObjectSchema } from 'joi'

interface IValidationSchema {
  getSchema(): ObjectSchema
}

export { IValidationSchema }
