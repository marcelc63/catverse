// React-hook-form validation patterns

export const phonePattern = {
  value: /^\+[1-9][0-9]{9,15}$/,
  message: 'Phone format should be like +628171231234',
}

export const emailPattern = {
  value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  message: 'Invalid email address (must be valid email and lowercased)',
}

export const alphanumericPattern = {
  value: /^[a-zA-Z0-9]*$/,
  message: 'Only alphabet and numbers allowed',
}

export const alphanumericdashPattern = {
  value: /^[a-zA-Z0-9-]*$/,
  message: 'Only alphabet, numbers and dash allowed',
}

export const instagramPattern = {
  value: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/,
  message: 'Invalid Instagram handle',
}

export const facebookPattern = {
  value: /^[a-z\d.]{5,}$/,
  message: 'Invalid Facebook username',
}

export const positiveNumberPattern = {
  value: /^\d+$/,
  message: "Amount can't be negative",
}
