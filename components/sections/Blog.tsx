import { getAllBlogs } from "@/actions/blog.actions"
import Blog from "./BlogCarousel"

export default async function BlogPage() {
  const blogs = await getAllBlogs()

  return <Blog blogs={blogs} />
}
