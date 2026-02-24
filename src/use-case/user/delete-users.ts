import type { Usuario } from "@/@types/prisma/client.js"
import type { UsersRepository } from "@/repositories/users-repository.js"
import { UserDoesntexist } from "../errors/user-does-not-exist.js"

// usuario que sera devolvido mostrando que foi apagado
type DeletedUserUseCaseResponse = {
    user: Usuario
}

export class DeleteUserUseCase {
    constructor (private usersRepository: UsersRepository) {}
    async execute( email: string ): Promise<DeletedUserUseCaseResponse> {
        // checamos se o usuario existe:
        const userWithEmail = await this.usersRepository.findByEmail(email)

        if (!userWithEmail) {
            throw new UserDoesntexist()
        }
        
        const user = await this.usersRepository.delete(email)
        
        return { user }
    }
}