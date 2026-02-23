import z from 'zod'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeReadUserUseCase } from '@/use-case/factories/user/read-user-use-case.js';

export async function readbyId(request: FastifyRequest, reply: FastifyReply)  {

    const paramsSchema = z.object({
        id: z.coerce.number(), 
    });

    const { id } = paramsSchema.parse(request.params)

    const readUserUseCase = makeReadUserUseCase()
    const { user } = await readUserUseCase.execute(id)

    return reply.status(201).send(user)
}