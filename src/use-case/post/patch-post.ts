import type { Post } from "@/@types/prisma/client.js"
import type { PostsRepository } from "@/repositories/posts-repository.js";
import { PostDoesntexist } from "../errors/post-does-not-exist.js";

interface PatchPostUseCaseRequest {
    titulo?: string | undefined;
    Conteudo?: string | undefined;
}

type PatchPostUseCaseResponse = {
    post: Post
}

export class PatchPostUseCase {
    constructor (private postsRepository: PostsRepository) {}
    async execute (id: number, { 
        titulo,
        Conteudo,
        }: PatchPostUseCaseRequest ): Promise<PatchPostUseCaseResponse>{

        let post = await this.postsRepository.findById(id)

        // caso post nao exista:
        if (!post) throw new PostDoesntexist()

        
        const dataToUpdate: any = {}
    
        if (titulo !== undefined) {
            dataToUpdate.titulo = titulo
        }
    
        if (Conteudo !== undefined) {
            dataToUpdate.Conteudo = Conteudo
        }
    
        post = await this.postsRepository.update(id, dataToUpdate)
    
        return { post }
    }
}