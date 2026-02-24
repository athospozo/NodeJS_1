import z from 'zod'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { makePostUseCase } from '@/use-case/factories/post/make-register-use-case.js';

export async function register(request: FastifyRequest, reply: FastifyReply)  {
    const registerBodySchema = z.object({
        titulo: z.string().trim().min(1).max(100),
        Conteudo: z.string().trim().min(1).max(1000),
        Idautor: z.int(),
    }); 

    const { titulo, Conteudo, Idautor } = registerBodySchema.parse(request.body);

    const createPostUseCase = makePostUseCase()
    const { post } = await createPostUseCase.execute({
        titulo,
        Conteudo,
        Idautor
    })

    return reply.status(201).send(post);
}