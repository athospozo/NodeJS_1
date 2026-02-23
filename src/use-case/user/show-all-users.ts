import type { UsersRepository } from "@/repositories/users-repository.js"

export class ShowAllUsersUseCase {
    constructor (private usersRepository: UsersRepository) {}
    async execute (): Promise<any> {
        
        const usuarios = await this.usersRepository.findAll()

        return usuarios
    }
}