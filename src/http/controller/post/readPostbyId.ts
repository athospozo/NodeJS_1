import z from 'zod'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { readByIdPostUseCase } from '@/use-case/factories/post/read-by-id-use-case.js';

export async function readbyId(request: FastifyRequest, reply: FastifyReply)  {

    const paramsSchema = z.object({
        id: z.coerce.number(), 
    });

    const { id } = paramsSchema.parse(request.params)

    const readPostByIdUseCase = readByIdPostUseCase()
    const { post } = await readPostByIdUseCase.execute(id)

    return reply.status(200).send(post)
}