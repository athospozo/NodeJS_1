import type { Post } from "@/@types/prisma/client.js";
import type { PostsRepository } from "@/repositories/posts-repository.js";

interface RegisterPostUseCaseRequest {
    titulo: string;
    Conteudo: string;
    Idautor: number;
}

type RegisterPostUseCaseResponse = {
    post: Post
}

export class RegisterPostUseCase {
    constructor (private postsRepository: PostsRepository) {}
    async execute({
        titulo,
        Conteudo,
        Idautor
    }: RegisterPostUseCaseRequest): Promise<RegisterPostUseCaseResponse> {

        const post = await this.postsRepository.create({
            titulo,
            Conteudo,
            autorId: Idautor
        })
    
        return { post }
    }

}