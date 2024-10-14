import { StatusCodes } from 'http-status-codes'
import Exception from '../exception/Exception.js'

const validate = (schema) => (request, response, next) => {
  const dataToValidate =
    Object.keys(request.body).length > 0 ? request.body : request.query
  const { error, value } = schema.validate(dataToValidate, {
    abortEarly: false
  })
  if (error) {
    const errorMessages = error.details.map((err) => err.message)
    throw new Exception(StatusCodes.BAD_REQUEST, errorMessages)
  }
  request.validatedData = value
  next()
}

export default validate
