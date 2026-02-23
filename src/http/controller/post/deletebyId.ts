import z from 'zod'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { DeletePostUseCase } from '@/use-case/post/delete-post.js';

export async function deletePostbyId (request: FastifyRequest, reply: FastifyReply){

    const paramSchema = z.object({
        id: z.coerce.number().int(),
    }); 
    
    const { id } = paramSchema.parse(request.params)

   const { post } = await new DeletePostUseCase().execute(id)

    return reply.status(200).send({
        message: "Post deletado com sucesso!",
        postDeletado: post
    })
}