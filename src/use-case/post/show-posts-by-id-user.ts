import type { PostsRepository } from "@/repositories/posts-repository.js";

export class ShowPostsUserUseCase{
    constructor (private postsRepository: PostsRepository) {}
    async execute ( idautor: number ): Promise<any>{

        // vamos checar a existencia do usuario:
        const user = await this.postsRepository.findById(idautor)

        if (!user) {
            throw new Error('Usuário não existe')
        }

        const posts = await this.postsRepository.FindFromUser(idautor)

        return posts
    }
}