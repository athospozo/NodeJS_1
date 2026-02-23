import type { Usuario } from "@/@types/prisma/client.js";
import { hash } from 'bcryptjs'
import { env } from '@/env/index.js'
import type { UsersRepository } from "@/repositories/users-repository.js";

interface PatchUserUseCaseRequest {
    name?: string | undefined;
    email?: string | undefined;
    passwordHash?: string | undefined;
    photo?: string | undefined;
}

type PatchUserUseCaseResponse = {
    user: Usuario
}

export class PatchUserUseCase {
    constructor (private usersRepository: UsersRepository) {}
    async execute (id: number, { 
        name,
        email,
        passwordHash, 
        photo
        }: PatchUserUseCaseRequest ): Promise<PatchUserUseCaseResponse>{

        let user = await this.usersRepository.findById(id)

        // caso usuario nao exista:
        if (!user) throw new Error('Usuário não existe')

        
        const dataToUpdate: any = {}
    
        if (name !== undefined) {
            dataToUpdate.name = name
        }
    
        if (email !== undefined) {
            dataToUpdate.email = email
        }
    
        if (passwordHash !== undefined) {
            passwordHash = await hash(passwordHash, env.HASH_SALT_ROUNDS)
            dataToUpdate.passwordHash = passwordHash
        }
    
        if (photo !== undefined) {
            dataToUpdate.photo = photo
        }
    
        user = await this.usersRepository.update(id, dataToUpdate)
    
        return { user }
    }
}