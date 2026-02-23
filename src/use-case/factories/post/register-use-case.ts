import { PrismaPostsRepository } from "@/repositories/prisma/posts-prisma-repository.js";
import { RegisterPostUseCase } from "@/use-case/post/register-post.js";

export function makePostUseCase() {

    const postsRepository = new PrismaPostsRepository()
    const registerPostUseCase = new RegisterPostUseCase(postsRepository)

    return registerPostUseCase
}