import { PostService } from "../services/post.service";

export class PostController {
  private postService: PostService;

  constructor() {
    this.postService = new PostService();
  }

  async createPost(req: any, res: any) {
    try {
      const { title, content, keywords, authorId } = req.body;
      const post = await this.postService.createPost({
        title,
        content,
        keywords,
        authorId,
      });
      res.status(201).json(post);
    } catch (error: any) {
      res
        .status(500)
        .json({ error: "Failed to create post: " + error.message });
    }
  }

  async getAllPosts(req: any, res: any) {
    try {
      const posts = await this.postService.getAllPosts();
      res.status(200).json(posts);
    } catch (error: any) {
      res
        .status(500)
        .json({ error: "Failed to fetch posts: " + error.message });
    }
  }

  async getPostById(req: any, res: any) {
    try {
      const { id } = req.params;
      const post = await this.postService.getPostById(Number(id));
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ error: "Post not found" });
      }
    } catch (error: any) {
      res.status(500).json({ error: "Failed to fetch post: " + error.message });
    }
  }
}
