import React, { useRef } from 'react'
import { config } from '../../constants/config'
import { toast } from 'react-toastify'
interface Props {
  onChange: (file?: File) => void
}
export default function InputFile({ onChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileUpload = event.target.files?.[0]
    if (fileUpload && fileUpload.size >= config.maxSizeImage) {
      toast.error('Dụng lượng file tối đa 1 MB', {
        position: 'top-center'
      })
    } else if (fileUpload && !fileUpload.type.includes('image')) {
      toast.error('Định dạng:.JPEG, .PNG', {
        position: 'top-center'
      })
    }
    onChange && onChange(fileUpload)
  }
  const handleUpload = () => {
    fileInputRef.current?.click()
  }
  return (
    <div>
      <input
        className='hidden'
        type='file'
        accept='.jpg,.jpeg,.png'
        ref={fileInputRef}
        onChange={handleFileInputChange}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onClick={(event) => ((event.target as any).value = null)}
      />
      <button
        className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'
        type='button'
        onClick={handleUpload}
      >
        Chọn ảnh
      </button>
    </div>
  )
}
