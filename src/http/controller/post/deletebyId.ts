import z from 'zod'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeDeletePostUseCase } from '@/use-case/factories/post/make-delete-post-use-case.js';

export async function deletePostbyId (request: FastifyRequest, reply: FastifyReply){

    const paramSchema = z.object({
        id: z.coerce.number().int(),
    }); 
    
    const { id } = paramSchema.parse(request.params)

    const deletePostUseCase = makeDeletePostUseCase()
    const { post } = await deletePostUseCase.execute(id)

    return reply.status(200).send({
        message: "Post deletado com sucesso!",
        postDeletado: post
    })
}