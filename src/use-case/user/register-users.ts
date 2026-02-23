import type { Usuario } from "@/@types/prisma/client.js";
import { prisma } from "@/libs/prisma.js";
import { hash } from 'bcryptjs'
import { env } from '@/env/index.js'

interface RegisterUserUseCaseRequest {
    name: string;
    email: string;
    password: string;
    picture?: string;
}

type RegisterUserUseCaseResponse = {
    user: Usuario
}

export class RegisterUserUseCase {
    async execute({
        name,
        email,
        password,
        picture
    }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
        const userWithSameEmail = await prisma.usuario.findFirst({
            where: {
                email,
            }
        })

        if (userWithSameEmail) {
            throw new Error('Email já está em uso')
        }

        const passwordHash = await hash(password, env.HASH_SALT_ROUNDS)
        
        const user = await prisma.usuario.create ({
            data: {
                name,
                email,
                passwordHash,
                photo: picture ?? "",
            }
        })
    
    
        return { user }
    }

}