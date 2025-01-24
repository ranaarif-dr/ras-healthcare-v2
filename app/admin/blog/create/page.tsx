import BlogForm from '@/components/BlogForm'
import React from 'react'

const CreateBlogPage = () => {
  return (
    <div className='container mt-5'>
        <h1 className='text-4xl font-bold'>Create Blog</h1>
        <BlogForm type="create" />
    </div>
  )
}

export default CreateBlogPage
