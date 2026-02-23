import z from 'zod'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { ShowPostsUserUseCase } from '@/use-case/post/show-posts-by-id-user.js';
import { PrismaPostsRepository } from '@/repositories/prisma/posts-prisma-repository.js';

export async function getbyIdUsers(request: FastifyRequest, reply: FastifyReply) {

    const paramsSchema = z.object({
        iduser: z.coerce.number(), 
    });

    const { iduser } = paramsSchema.parse(request.params)

    const postsRepository = new PrismaPostsRepository()
    const posts = await new ShowPostsUserUseCase(postsRepository).execute(iduser)

    return reply.status(200).send(posts)
}