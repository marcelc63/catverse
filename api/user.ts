import API from '~/api/client'

export async function get() {
  return await API.handle(API.private.get(`/api/v1/users`))
}

export async function register(payload: object) {
  return await API.handle(API.public.post(`/api/public/users`, payload))
}
