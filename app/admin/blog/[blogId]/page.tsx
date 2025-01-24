import { getBlog } from '@/actions/blog.actions'
import BlogForm from '@/components/BlogForm'
import React from 'react'

const UpdateBlogPage = async({ params }: { params: any}) => {
    const {blogId}= await params
    const blog = await getBlog(blogId!)
  return (
    <div className='container mt-5'>
        <h1 className='text-4xl font-bold'>Update Blog</h1>
        <BlogForm type="update" blog={blog} />
    </div>
  )
}

export default UpdateBlogPage
