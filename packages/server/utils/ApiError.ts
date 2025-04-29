export class ApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super()
    this.status = status
    this.message = message
  }

  static unauthorized(message: string) {
    return new ApiError(401, message)
  }
}
