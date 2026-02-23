import { ShowAllPostsUseCase } from '@/use-case/post/show-all-posts.js'
import type { FastifyRequest, FastifyReply } from 'fastify'

export async function showAll(request: FastifyRequest, reply: FastifyReply) {
    
    const posts = await new ShowAllPostsUseCase().execute()

    return reply.status(200).send(posts);
} 
