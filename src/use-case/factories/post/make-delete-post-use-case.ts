import { PrismaPostsRepository } from "@/repositories/prisma/posts-prisma-repository.js";
import { DeletePostUseCase } from "@/use-case/post/delete-post.js";

export function makeDeletePostUseCase() {

    const postsRepository = new PrismaPostsRepository()
    const deletePostUseCase = new DeletePostUseCase(postsRepository)

    return deletePostUseCase
}