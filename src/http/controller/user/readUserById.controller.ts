import z from 'zod'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { ReadUserById } from '@/use-case/user/read-user.js';
import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js';

export async function readbyId(request: FastifyRequest, reply: FastifyReply)  {

    const paramsSchema = z.object({
        id: z.coerce.number(), 
    });

    const { id } = paramsSchema.parse(request.params)

    const usersRepository = new PrismaUsersRepository()
    const { user } = await new ReadUserById(usersRepository).execute(id)

    return reply.status(201).send(user)
}