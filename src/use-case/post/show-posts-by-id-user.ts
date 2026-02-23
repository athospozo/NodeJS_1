import { prisma } from "@/libs/prisma.js";

export class ShowPostsUserUseCase{
    async execute ( idautor: number ): Promise<any>{

        // vamos checar a existencia do usuario:
        const user = prisma.usuario.findFirst({
            where : {
                id: idautor
            }
        })

        if (!user) {
            throw new Error('Usuário não existe')
        }

        const posts = await prisma.post.findMany({
            where : {
                autorId: idautor
            }
        })

        return posts
    }
}