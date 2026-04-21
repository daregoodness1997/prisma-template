import { prisma } from "../../lib/prisma";

type Post = {
  title: string;
  content: string;
  keywords: string[];
  authorId: number;
};

export class PostService {
  async createPost(data: Post) {
    const post = await prisma.post.create({
      data,
    });
    return post;
  }

  async getAllPosts() {
    const posts = await prisma.post.findMany();
    return posts;
  }

  async getPostById(id: number) {
    const post = await prisma.post.findUnique({
      where: { id },
    });
    return post;
  }
}
