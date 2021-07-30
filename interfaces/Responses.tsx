export interface IResponses {
  error: any
  meta: any
  payload: any
  type: string
}

export type SuccessStatus = 200 | 201 | 202
export type ErrorStatus = 300 | 301 | 400 | 404 | 405 | 412 | 500 | 501 | 502

export const SuccessStatus: Array<SuccessStatus> = [200, 201, 202]
export const ErrorStatus: Array<ErrorStatus> = [
  300, 301, 400, 404, 405, 412, 500, 501, 502,
]

export type Loading = 'fulfilled' | 'pending' | 'dormant' | 'failed'
