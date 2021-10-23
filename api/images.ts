import API from '~/api/client'

export async function uploadImage(file: any) {
  return await API.handle(API.privateFormData.post(`/api/v1/images`, file))
}
