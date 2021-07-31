import * as React from 'react'
import { useState } from 'react'

import { createFormData } from '~/helpers/upload'
import { uploadImage } from '~/api/images'

import Button from '~/components/base/Button'

interface IUploadImage {
  onChange: Function
  className?: string
}

const UploadImage: React.FC<IUploadImage> = ({ onChange, className }) => {
  const [loading, setLoading] = useState(false)

  const handleUpload = async ({ target }: { target: any }) => {
    const formData = createFormData(target)
    setLoading(true)

    const [res, resErr] = await uploadImage(formData)
    if (res) {
      const { data } = res
      onChange(data.image_url)
      setLoading(false)
    } else if (resErr) {
      setLoading(false)
      return false
    }
  }

  return (
    <div className={`flex w-2/12 ${className}`}>
      <input
        accept="image/*"
        multiple
        type="file"
        id="upload-image"
        className="hidden"
        onChange={handleUpload}
      />
      <label
        htmlFor="upload-image"
        className="flex flex-row items-center w-full"
      >
        <Button large className="w-full text-center">
          {loading ? `Loading...` : `Choose File`}
        </Button>
      </label>
    </div>
  )
}

export default UploadImage
