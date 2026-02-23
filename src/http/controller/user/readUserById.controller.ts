import z from 'zod'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { ReadUserById } from '@/use-case/user/read-user.js';

export async function readbyId(request: FastifyRequest, reply: FastifyReply)  {

    const paramsSchema = z.object({
        id: z.coerce.number(), 
    });

    const { id } = paramsSchema.parse(request.params)

    const { user } = await new ReadUserById().execute(id)

    return reply.status(201).send(user)
}