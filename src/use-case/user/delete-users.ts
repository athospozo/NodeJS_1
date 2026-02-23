import type { Usuario } from "@/@types/prisma/client.js"
import { prisma } from "@/libs/prisma.js"

// usuario que sera devolvido mostrando que foi apagado
type DeletedUserUseCaseResponse = {
    user: Usuario
}

export class DeleteUserUseCase {
    async execute( email: string ): Promise<DeletedUserUseCaseResponse> {
        // checamos se o usuario existe:
        const user = await prisma.usuario.findFirst({
            where: {
                email,
            }
        })

        if (!user) {
            throw new Error('Usuário não existe')
        }
        
        await prisma.usuario.delete({
            where: {
                email: user.email
            }
    
        })
        return { user }
    }

}