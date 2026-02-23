import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js';
import { ShowAllUsersUseCase } from '@/use-case/user/show-all-users.js';
import type { FastifyRequest, FastifyReply } from 'fastify'

export async function showAll(request: FastifyRequest, reply: FastifyReply) {
    
    const usersRepository = new PrismaUsersRepository()
    const usuarios = await new ShowAllUsersUseCase(usersRepository).execute()

    return reply.status(200).send(usuarios);
} 
