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
    console.log(error);
    return error;
  }
};

export const createPost = async (formData: FormData) => {
  const rawFormData = {
    title: formData.get("title") as string,
    text: formData.get("content") as string,
    author: formData.get("author") as string,
    type: formData.get("category") as string,
  };

  try {
    const post = await prisma.post.create({
      data: {
        ...rawFormData,
        userId: "d2f7463e-e634-415a-97a2-c1ace7bda5cd", // TODO: get user id from session
      },
    });

    return post;
  } catch (error) {
    console.log(error);
    return error;
  }
};
