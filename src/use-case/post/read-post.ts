import type { Post } from "@/@types/prisma/client.js"
import type { PostsRepository } from "@/repositories/posts-repository.js"
  
type GetPostUseCaseResponse = {
    post: Post
}   
    
export class ReadPostById{
    constructor (private postsRepository: PostsRepository) {}
    async execute ( id: number ): Promise<GetPostUseCaseResponse>{

        const post = await this.postsRepository.findById(id)

        if (!post) throw new Error ("Post não existe!")

        return { post }
    }
}