import { ShowAllUsersUseCase } from '@/use-case/user/show-all.js';
import type { FastifyRequest, FastifyReply } from 'fastify'

export async function showAll(request: FastifyRequest, reply: FastifyReply) {
    
    const usuarios = await new ShowAllUsersUseCase().execute()

    return reply.status(200).send(usuarios);
} 
