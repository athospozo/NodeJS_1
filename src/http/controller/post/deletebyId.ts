import z from 'zod'
import { prisma } from '@/libs/prisma.js'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function deletePostbyId (request: FastifyRequest, reply: FastifyReply){
    const deleteBodySchema = z.object({
        Id: z.number().int(),
    }); 
    
    const { Id } = deleteBodySchema.parse(request.body);

    const post = await prisma.post.delete ({
        where: {
            id: Id,
        }
    })

    return reply.status(201).send({
        message: "Post deletado com sucesso!",
        postDeletado: post
    })
}