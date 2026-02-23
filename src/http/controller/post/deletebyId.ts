import z from 'zod'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { DeletePostUseCase } from '@/use-case/post/delete-post.js';
import { PrismaPostsRepository } from '@/repositories/prisma/posts-prisma-repository.js';

export async function deletePostbyId (request: FastifyRequest, reply: FastifyReply){

    const paramSchema = z.object({
        id: z.coerce.number().int(),
    }); 
    
    const { id } = paramSchema.parse(request.params)

    const postsRepository = new PrismaPostsRepository()
    const { post } = await new DeletePostUseCase(postsRepository).execute(id)

    return reply.status(200).send({
        message: "Post deletado com sucesso!",
        postDeletado: post
    })
}