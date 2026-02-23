import type { Usuario } from "@/@types/prisma/client.js"
import { prisma } from "@/libs/prisma.js"
  
type GetUserUseCaseResponse = {
    user: Usuario
}   
    
export class ReadUserById{
    async execute ( id: number ): Promise<GetUserUseCaseResponse>{

        let user = await prisma.usuario.findUnique({
            where:{
                id: id,
            },
        })

        if (!user) throw new Error ("Usuário nãao existe!")

        return { user }
    }
}