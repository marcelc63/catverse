import axios from 'axios'
import Cookie from 'js-cookie'

class APIClient {
  private: any
  privateFormData: any
  public: any

  constructor() {
    // Auth API client
    this.private = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_HOST,
      withCredentials: true,
    })

    // Auth API Form Data
    this.privateFormData = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_HOST,
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    this.createRequestInterceptor()
    this.createResponseInterceptor()

    // Non-Auth API client
    this.public = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_HOST,
      withCredentials: true,
    })
  }

  createRequestInterceptor = () => {
    this.private.interceptors.request.use(
      function (config: any) {
        if (config.method !== 'get') {
          config.headers['X-CSRF-Token'] = Cookie.get('csrf')
        }
        return config
      },
      function (error: any) {
        return Promise.reject(error)
      }
    )

    this.privateFormData.interceptors.request.use(
      function (config: any) {
        if (config.method !== 'get') {
          config.headers['X-CSRF-Token'] = Cookie.get('csrf')
        }
        return config
      },
      function (error: any) {
        return Promise.reject(error)
      }
    )
  }

  createResponseInterceptor = () => {
    this.private.interceptors.response.use(
      (response: any) => {
        return response
      },
      (error: any) => {
        if (error?.response?.status === 401) {
          //   store.dispatch(reset())
        }
        return Promise.reject(error)
      }
    )
  }

  handle = (promise: Promise<any>) => {
    return promise
      .then((data: any) => [data, undefined])
      .catch((error: any) => [undefined, error.response])
  }
}

export default new APIClient()
