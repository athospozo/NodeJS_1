import z from 'zod'
import { RegisterPostUseCase } from '@/use-case/post/register-post.js'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaPostsRepository } from '@/repositories/prisma/posts-prisma-repository.js';

export async function register(request: FastifyRequest, reply: FastifyReply)  {
    const registerBodySchema = z.object({
        titulo: z.string().trim().min(1).max(100),
        Conteudo: z.string().trim().min(1).max(1000),
        Idautor: z.int(),
    }); 

    const { titulo, Conteudo, Idautor } = registerBodySchema.parse(request.body);

    const postsRepository = new PrismaPostsRepository()
    const { post } = await new RegisterPostUseCase(postsRepository).execute({
        titulo,
        Conteudo,
        Idautor
    })

    return reply.status(201).send(post);
}