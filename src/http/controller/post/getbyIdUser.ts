import z from 'zod'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { makeShowByIdUserUseCase } from '@/use-case/factories/post/make-show-by-id-user.js';

export async function getbyIdUsers(request: FastifyRequest, reply: FastifyReply) {

    const paramsSchema = z.object({
        iduser: z.coerce.number(), 
    });

    const { iduser } = paramsSchema.parse(request.params)

    const postsUserUseCase = makeShowByIdUserUseCase()
    const posts = await postsUserUseCase.execute(iduser)

    return reply.status(200).send(posts)
}