import { makeShowAllUsersUseCase } from '@/use-case/factories/user/show-all-use-case.js';
import type { FastifyRequest, FastifyReply } from 'fastify'

export async function showAll(request: FastifyRequest, reply: FastifyReply) {
    
    const showAllUsersUseCase = makeShowAllUsersUseCase()
    const usuarios = await showAllUsersUseCase.execute()

    return reply.status(200).send(usuarios);
} 
