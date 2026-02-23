import { PrismaPostsRepository } from "@/repositories/prisma/posts-prisma-repository.js";
import { PatchPostUseCase } from "@/use-case/post/patch-post.js"

export function makePatchPostUseCase() {

    const postsRepository = new PrismaPostsRepository()
    const patchPostUseCase = new PatchPostUseCase(postsRepository)

    return patchPostUseCase
}