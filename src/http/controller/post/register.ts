import z from 'zod'
import { RegisterPostUseCase } from '@/use-case/post/register-post.js'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function register(request: FastifyRequest, reply: FastifyReply)  {
    const registerBodySchema = z.object({
        titulo: z.string().trim().min(1).max(100),
        Conteudo: z.string().trim().min(1).max(1000),
        Idautor: z.int(),
    }); 

    const { titulo, Conteudo, Idautor } = registerBodySchema.parse(request.body);

    const { post } = await new RegisterPostUseCase().execute({
        titulo,
        Conteudo,
        Idautor
    })

    return reply.status(201).send(post);
}