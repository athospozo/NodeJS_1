import z from 'zod'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { PatchPostUseCase } from '@/use-case/post/patch-post.js';
import { PrismaPostsRepository } from '@/repositories/prisma/posts-prisma-repository.js';

export async function patchbyId(request: FastifyRequest, reply: FastifyReply)  {

    const paramsSchema = z.object({
        id: z.coerce.number(), // Transforma a string da URL em número
    });

    const PatchPostSchema = z.object({
        titulo: z.string().trim().min(1).max(100).optional(),
        Conteudo: z.string().trim().min(1).max(1000).optional(),
    }); 

    const { id } = paramsSchema.parse(request.params)

    const { titulo, Conteudo } = PatchPostSchema.parse(request.body);

    const postsRepository = new PrismaPostsRepository()
    const post = await new PatchPostUseCase(postsRepository).execute(id, {
        titulo,
        Conteudo,
    })

    return reply.status(200).send(post)
}