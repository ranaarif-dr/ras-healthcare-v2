"use server";

import { CreateBlogProps } from "@/types";
import { uploadFile } from "./imageupload";
import { BLOGS_COLLECTION_ID, DATABASE_ID, databases } from "@/lib/appwrite";
import { ID } from "node-appwrite";
import { parseStringify } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export const createBlog = async (blogData: CreateBlogProps) => {
  try {
    if (blogData.coverImage && blogData.coverImage.length > 0) {
      const image = await uploadFile(blogData.coverImage[0]);
      if (image) {
        const blog = await databases.createDocument(
          DATABASE_ID!,
          BLOGS_COLLECTION_ID!,
          ID.unique(),
          {
            title: blogData.title,
            content: blogData.content,
            coverImage: image.url,
            slug: blogData.slug,
          }
        );
        revalidatePath("/admin/blog");
            revalidatePath("/")
            revalidatePath("/blog")
        return parseStringify(blog);
      }
    }
  } catch (error) {
    console.log("Error while creating blog: ", error);
  }
};

export const getAllBlogs = async () => {
  try {
    const blogs = await databases.listDocuments(
      DATABASE_ID!,
      BLOGS_COLLECTION_ID!
    );
    return parseStringify(blogs.documents);
  } catch (error) {
    console.log("Error while getting blogs: ", error);
  }
};

export const getBlog = async (blogId: string) => {
  try {
    const blog = await databases.getDocument(
      DATABASE_ID!,
      BLOGS_COLLECTION_ID!,
      blogId
    );
    return parseStringify(blog);
  } catch (error) {
    console.log("Error while getting blog: ", error);
  }
};

export const updateBlog = async (blogId: string, blogData: CreateBlogProps) => {
  try {
    if (blogData.coverImage && blogData.coverImage.length > 0) {
      const image = await uploadFile(blogData.coverImage[0]);
      if (image) {
        const blog = await databases.updateDocument(
          DATABASE_ID!,
          BLOGS_COLLECTION_ID!,
          blogId,
          {
            title: blogData.title,
            content: blogData.content,
            coverImage: image.url,
            slug: blogData.slug,
          }
        );
        revalidatePath("/admin/blog");
            revalidatePath("/")
            revalidatePath("/blog")
        return parseStringify(blog);
      }
    }
  } catch (error) {
    console.log("Error while updating blog: ", error);
  }
};


export const deleteBlog = async (id: string) => {
    try {
        const blog = await databases.deleteDocument(
            DATABASE_ID!,
            BLOGS_COLLECTION_ID!,
            id)
            revalidatePath("/admin/blog");
            revalidatePath("/")
            revalidatePath("/blog")
            return parseStringify(blog);
    } catch (error) {
        console.log("Error while deleting blog: ", error);
    }
}
