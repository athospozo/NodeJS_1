import type { Post } from "@/@types/prisma/client.js"
import type { PostsRepository } from "@/repositories/posts-repository.js"
import { PostDoesntexist } from "../errors/post-does-not-exist.js"

// usuario que sera devolvido mostrando que foi apagado
type DeletedPostUseCaseResponse = {
    post: Post
}

export class DeletePostUseCase {
    constructor (private postsRepository: PostsRepository) {}
    async execute( id: number ): Promise<DeletedPostUseCaseResponse> {
        // checamos se o post existe:
        const postWithSameId = await this.postsRepository.findById(id)

        if (!postWithSameId) {
            throw new PostDoesntexist()
        }
        
        const post = await this.postsRepository.delete(id)

        return { post }
    }
}