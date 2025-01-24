"use client"
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { X } from 'lucide-react'
import Image from 'next/image'

interface ImageUploadProps {
  onImagesSelected: (images: File[]) => void
  maxImages: number
  className?: string
  existingImages?: string[] | string,
}

export function ImageUpload({ onImagesSelected, maxImages, className, existingImages }: ImageUploadProps) {
  const [images, setImages] = useState<File[]>([])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files)
      const updatedImages = [...images, ...newImages].slice(0, maxImages)
      setImages(updatedImages)
      onImagesSelected(updatedImages)
    }
  }

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index)
    setImages(updatedImages)
    onImagesSelected(updatedImages)
  }

  const existingImagesArray = existingImages ? (Array.isArray(existingImages) ? existingImages : [existingImages]) : []

  return (
    <div className={className}>
      <Input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageUpload}
        className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
      />
      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {existingImagesArray.map((imageUrl, index) => (
          <div key={`existing-${index}`} className="relative">
            <Image
              src={imageUrl}
              alt={`Existing image ${index + 1}`}
              className="w-full h-32 object-cover rounded-md"
              width={128}
              height={128}
            />
          </div>
        ))}
        {images.map((image, index) => (
          <div key={`new-${index}`} className="relative">
            <Image
              src={URL.createObjectURL(image)}
              alt={`Uploaded image ${index + 1}`}
              className="w-full h-32 object-cover rounded-md"
              width={128}
              height={128}
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-1 right-1"
              onClick={() => removeImage(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
