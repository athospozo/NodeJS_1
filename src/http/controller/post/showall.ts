import { makeShowAllUseCase } from '@/use-case/factories/post/show-all-use-case.js'
import type { FastifyRequest, FastifyReply } from 'fastify'

export async function showAll(request: FastifyRequest, reply: FastifyReply) {
    
    const showAllPostsUseCase = makeShowAllUseCase()
    const posts = await showAllPostsUseCase.execute()

    return reply.status(200).send(posts);
} 
