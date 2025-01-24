import { getAllBlogs } from "@/actions/blog.actions";
import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { Blog } from "@/types/appwrite.types";
import Link from "next/link";
import React from "react";

const BlogPage = async () => {
  const blogs = await getAllBlogs();
  return (
    <div className="container mx-auto py-10 px-5">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold mb-4">Blog Page</h1>
        <Button className="">
          <Link href="/admin/blog/create" className="flex items-center">
            Create
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((blog: Blog) => (
          <BlogCard type="admin" blog={blog} key={blog.$id} />
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
