import type { Usuario } from "@/@types/prisma/client.js"
import type { UsersRepository } from "@/repositories/users-repository.js"
  
type GetUserUseCaseResponse = {
    user: Usuario
}   
    
export class ReadUserById{
    constructor (private usersRepository: UsersRepository) {}
    async execute ( id: number ): Promise<GetUserUseCaseResponse>{

        const user = await this.usersRepository.findById(id)

        if (!user) throw new Error ("Usuário não existe!")

        return { user }
    }
}