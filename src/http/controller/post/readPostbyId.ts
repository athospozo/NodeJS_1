import z from 'zod'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { ReadPostById } from '@/use-case/post/read-post.js';
import { PrismaPostsRepository } from '@/repositories/prisma/posts-prisma-repository.js';

export async function readbyId(request: FastifyRequest, reply: FastifyReply)  {

    const paramsSchema = z.object({
        id: z.coerce.number(), 
    });

    const { id } = paramsSchema.parse(request.params)

    const postsRepository = new PrismaPostsRepository()
    const { post } = await new ReadPostById(postsRepository).execute(id)

    return reply.status(200).send(post)
}