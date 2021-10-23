import API from '~/api/client'

export async function login(payload: object) {
  return await API.handle(API.public.post(`/api/public/login`, payload))
}

export async function logout() {
  return await API.handle(API.public.post(`/api/v1/logout`))
}

export async function check() {
  return await API.handle(API.public.post(`/api/v1/check`))
}
