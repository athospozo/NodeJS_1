import type { Post } from "@/@types/prisma/client.js";
import { prisma } from "@/libs/prisma.js";

interface RegisterPostUseCaseRequest {
    titulo: string;
    Conteudo: string;
    Idautor: number;
}

type RegisterPostUseCaseResponse = {
    post: Post
}

export class RegisterPostUseCase {
    async execute({
        titulo,
        Conteudo,
        Idautor
    }: RegisterPostUseCaseRequest): Promise<RegisterPostUseCaseResponse> {

        const post = await prisma.post.create ({
            data: {
                titulo,
                Conteudo,
                autorId: Idautor
            }
        })
    
        return { post }
    }

}