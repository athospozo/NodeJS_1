import type { Post } from "@/@types/prisma/client.js"
import { prisma } from "@/libs/prisma.js"

interface PatchPostUseCaseRequest {
    titulo?: string | undefined;
    Conteudo?: string | undefined;
}

type PatchPostUseCaseResponse = {
    post: Post
}

export class PatchPostUseCase {
    async execute (id: number, { 
        titulo,
        Conteudo,
        }: PatchPostUseCaseRequest ): Promise<PatchPostUseCaseResponse>{

        let post = await prisma.post.findFirst({
            where : {
                id
            }
        })

        // caso post nao exista:
        if (!post) throw new Error('Post não existe')

        
        const dataToUpdate: any = {}
    
        if (titulo !== undefined) {
            dataToUpdate.titulo = titulo
        }
    
        if (Conteudo !== undefined) {
            dataToUpdate.Conteudo = Conteudo
        }
    
        post = await prisma.post.update({
            where:{
                id
            },
            data: dataToUpdate,
        })
    
        return { post }
    }
}