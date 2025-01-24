"use client";
import { Blog } from "@/types/appwrite.types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Editor } from "./Editor";
import { ImageUpload } from "./Image-upload";
import SubmitButton from "./SubmitBtn";
import { createBlog, updateBlog } from "@/actions/blog.actions";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  content: z.string().min(1, {
    message: "Content is required",
  }),
  coverImage: z
    .union([z.array(z.instanceof(File)), z.array(z.string())])
    .optional(),
  slug: z.string().min(1, {
    message: "Slug is required",
  }),
});

const BlogForm = ({
  type,
  blog,
}: {
  type: "create" | "update";
  blog?: Blog;
}) => {
    const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: blog?.title ?? "",
      content: blog?.content ?? "",
      coverImage: blog?.coverImage ? [blog.coverImage] : undefined,
      slug: blog?.slug ?? "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
        if(type === "create"){
      const blogData = {
        title: values.title,
        content: values.content,
        coverImage: values.coverImage ? values.coverImage : undefined,
        slug: values.slug,
      };
      router.push("/admin/blog");
      await createBlog(blogData);
    }
    if(type === "update" && blog?.$id){
      const blogData = {
        title: values.title,
        content: values.content,
        coverImage: values.coverImage ? values.coverImage : undefined,
        slug: values.slug,
      };
      await updateBlog(blog.$id, blogData);
      router.push("/admin/blog");
    }
    } catch (error) {
      console.log("error while submitting blog form: ", error);
    }
    setIsLoading(false);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Editor value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="coverImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Image</FormLabel>
              <FormControl>
                <ImageUpload
                  onImagesSelected={(images) => field.onChange(images)}
                  maxImages={1}
                  className="mt-2"
                  existingImages={blog?.coverImage ? [blog.coverImage] : undefined}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder="Slug" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton isLoading={isLoading}>{type} Blog</SubmitButton>
      </form>
    </Form>
  );
};
export default BlogForm;
