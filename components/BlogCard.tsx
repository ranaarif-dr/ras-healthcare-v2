import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { ArrowRight, Pencil, Trash } from "lucide-react";
import { Blog } from "@/types/appwrite.types";
import Link from "next/link";
import { BlogDeleteConfirmationDialog } from "./BlogDeleteConfirmation";

const BlogCard = ({ blog, type }: { blog: Blog; type: "admin" | "user" }) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-lg overflow-hidden ${
        type === "user"
          ? "hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          : ""
      }`}
    >
      <div className="relative group">
        <Image
          src={blog.coverImage}
          alt={`Blog post`}
          width={300}
          height={100}
          className={`w-full aspect-video object-cover ${
            type === "user"
              ? "group-hover:scale-110 transition-transform duration-500"
              : ""
          }`}
        />
        <div
          className={`absolute inset-0 opacity-0 ${
            type === "user"
              ? "group-hover:opacity-100 transition-opacity duration-500"
              : ""
          }`}
        />
      </div>
      <div className="p-8">
        <h3
          className={`font-bold text-2xl mb-4 text-gray-800 ${
            type === "user"
              ? "hover:text-blue-600 transition-colors duration-300"
              : ""
          }`}
        >
          {blog.title}
        </h3>
        <p className="text-gray-600 mb-6 line-clamp-2 text-lg">
          Learn about the crucial role Vitamin D plays in maintaining your
          overall health and well-being.
        </p>
        <div className="flex gap-3">
          {type === "user" && (
            <Button
              asChild
              variant="expandIcon"
              Icon={ArrowRight}
              iconPlacement="right"
              className="flex items-center hover:scale-110 transition-transform duration-300 text-lg px-6 py-3"
            >
              <Link
                href={`/blog//${blog.slug}/${blog.$id}`}
                className="flex items-center"
              >
                Read More
              </Link>
            </Button>
          )}

          {type === "admin" && (
            <>
              <Button
                variant="outline"
                asChild
                className="flex items-center text-lg px-6 py-3"
              >
                <Link
                  href={`/admin/blog/${blog.$id}`}
                  className="flex items-center"
                >
                  Edit <Pencil className="ml-3 h-5 w-5" />
                </Link>
              </Button>
              <BlogDeleteConfirmationDialog blogId={blog.$id}>
                <Button
                  variant="destructive"
                  className="flex items-center text-lg px-6 py-3"
                >
                  Delete <Trash className="ml-3 h-5 w-5" />
                </Button>
              </BlogDeleteConfirmationDialog>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
