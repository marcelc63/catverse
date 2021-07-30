import API from '~/api/client'

export async function login(payload: object) {
  return await API.handle(API.public.post(`/api/v1/login`, payload))
}

export async function logout() {
  return await API.handle(API.public.post(`/api/v1/logout`))
}
