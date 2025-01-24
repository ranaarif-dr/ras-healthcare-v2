import { getBlog } from '@/actions/blog.actions'
import BlogPost from '@/components/BlogPost'

export default async function BlogPostPage({ params } : {params:any}) {
    const { blogId } = await params
    const blog = await getBlog(blogId)
  return <BlogPost {...blog} />
}
