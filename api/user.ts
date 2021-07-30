import API from '~/api/client'

export async function get() {
  return await API.handle(API.private.get(`/api/v1/auth/users/current_user`))
}

export async function register(payload: object) {
  return await API.handle(API.public.post(`/api/v1/users`, payload))
}
