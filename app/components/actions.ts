"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllPosts = async () => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: true,
      },
    });

    return posts;
  } catch (error) {
    return { message: `Posts not found. Here is the full error: ${error}` };
  }
};

export const getPendingPosts = async () => {
  try {
    const pendingPosts = await prisma.post.findMany({
      where: {
        isApproved: false,
      },
      include: {
        user: true,
      },
    });

    return pendingPosts;
  } catch (error) {
    return { message: `Posts not found. Here is the full error: ${error}` };
  }
};

export const getPost = async (slug: string) => {
  try {
    const post = await prisma.post.findUnique({
      where: { slug },
    });

    return post;
  } catch (error) {
    return { message: `Post not found. Here is the full error. ${error}` };
  }
};

export const createPost = async (formData: FormData) => {
  const title = formData.get("title") as string;
  const text = formData.get("content") as string;
  const author = formData.get("author") as string;

  // create slug from title
  const slug = `${title?.split(" ").slice(0, 5).join("-")}-${Math.random()
    .toString(36)
    .slice(2)}`.replace(/[^a-zA-Z0-9-]/g, "");

  // trim whitespace from beginning and end of string
  const trimTitle = title.trim();
  const trimText = text.trim();
  const trimAuthor = author.trim();

  const rawFormData = {
    slug,
    title: trimTitle,
    text: trimText,
    author: trimAuthor,
    type: formData.get("category") as string,
  };

  try {
    const post = await prisma.post.create({
      data: {
        ...rawFormData,
        userId: "c82d3ac8-16cf-43c5-951f-75b31d93e952", // TODO: get user id from session
      },
    });

    return post;
  } catch (error) {
    return { message: `Post not created. Here is the full error: ${error}` };
  }
};
