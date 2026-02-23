import z from 'zod'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { ReadPostById } from '@/use-case/post/read-post.js';

export async function readbyId(request: FastifyRequest, reply: FastifyReply)  {

    const paramsSchema = z.object({
        id: z.coerce.number(), 
    });

    const { id } = paramsSchema.parse(request.params)

    const { post } = await new ReadPostById().execute(id)

    return reply.status(200).send(post)
}