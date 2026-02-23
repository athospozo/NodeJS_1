import type { Post } from "@/@types/prisma/client.js"
import { prisma } from "@/libs/prisma.js"

// usuario que sera devolvido mostrando que foi apagado
type DeletedPostUseCaseResponse = {
    post: Post
}

export class DeletePostUseCase {
    async execute( id: number ): Promise<DeletedPostUseCaseResponse> {
        // checamos se o post existe:
        const post = await prisma.post.findFirst({
            where: {
                id
            }
        })

        if (!post) {
            throw new Error('Post não existe')
        }
        
        await prisma.post.delete({
            where: {
                id: post.id
            }
    
        })
        
        return { post }
    }
}