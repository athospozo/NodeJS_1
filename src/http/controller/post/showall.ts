import { PrismaPostsRepository } from '@/repositories/prisma/posts-prisma-repository.js';
import { ShowAllPostsUseCase } from '@/use-case/post/show-all-posts.js'
import type { FastifyRequest, FastifyReply } from 'fastify'

export async function showAll(request: FastifyRequest, reply: FastifyReply) {
    
    const postsRepository = new PrismaPostsRepository()
    const posts = await new ShowAllPostsUseCase(postsRepository).execute()

    return reply.status(200).send(posts);
} 
