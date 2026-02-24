import type { Post } from "@/@types/prisma/client.js"
import type { PostsRepository } from "@/repositories/posts-repository.js"
import { PostDoesntexist } from "../errors/post-does-not-exist.js"

// usuario que sera devolvido mostrando que foi apagado
type DeletedPostUseCaseResponse = {
    post: Post
}

export class DeletePostUseCase {
    constructor (private postsRepository: PostsRepository) {}
    async execute( publicid: string ): Promise<DeletedPostUseCaseResponse> {
        // checamos se o post existe:
        const postWithSameId = await this.postsRepository.findBy({ publicId: publicid })

        if (!postWithSameId) {
            throw new PostDoesntexist()
        }
        
        const postdeletado = await this.postsRepository.delete(postWithSameId.id)

        return { post: postdeletado }
    }
}