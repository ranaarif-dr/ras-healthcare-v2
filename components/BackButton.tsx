"use client"
import React from 'react'
import { Button } from './ui/button'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

const BackButton = () => {
    const router = useRouter()
  return (
    <Button
    variant="ghost"
    onClick={() => router.back()}
    className="mb-4 text-blue-600 hover:text-blue-800"
  >
    <ArrowLeft className="mr-2 h-4 w-4" />
    Back to Products
  </Button>
  )
}

export default BackButton
