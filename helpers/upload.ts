export const createFormData = (target: any) => {
  const formData = new FormData()
  const file = target.files[0]
  //Check if file exist or not
  if (!file) {
    return
  }
  //Validation
  let isValidated = true
  let name = ''
  switch (file.type) {
    case 'image/jpeg':
      name = 'image.jpeg'
      break
    case 'image/png':
      name = 'image.png'
      break
    default:
      isValidated = false
      break
  }
  if (file.size > 5 * 1024 * 1024) {
    isValidated = false
  }

  if (!isValidated) {
    return
  }

  //Reconstruct file
  const blob = file.slice(0, file.size, file.type)
  const newFile = new File([blob], name, { type: file.type })
  formData.append('file', newFile)

  return formData
}
