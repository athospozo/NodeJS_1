import type { Usuario } from "@/@types/prisma/client.js";
import { prisma } from "@/libs/prisma.js";
import { hash } from 'bcryptjs'
import { env } from '@/env/index.js'

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
    async execute (id: number, { 
        name,
        email,
        passwordHash, 
        photo
        }: PatchUserUseCaseRequest ): Promise<PatchUserUseCaseResponse>{

        let user = await prisma.usuario.findFirst({
            where : {
                id
            }
        })

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
    
        user = await prisma.usuario.update({
            where:{
                id: id,
            },
            data: dataToUpdate,
        })
    
        return { user }
    }
}