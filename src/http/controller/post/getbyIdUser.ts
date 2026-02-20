import z from 'zod'
import { prisma } from '@/libs/prisma.js'
import type { FastifyRequest, FastifyReply } from 'fastify'

export async function getbyIdUsers(request: FastifyRequest, reply: FastifyReply) {

    const paramsSchema = z.object({
        iduser: z.coerce.number(), 
    });

    const { iduser } = paramsSchema.parse(request.params)

    const posts = await prisma.post.findMany({
        where:{
            autorId: iduser,
        },
    })

    return reply.status(200).send(posts)
}