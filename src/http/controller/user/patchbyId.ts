import z from 'zod'
import { prisma } from '@/libs/prisma.js'
import type { FastifyReply, FastifyRequest } from 'fastify'

type PatchUserBody = {
    name?: string;
    email?: string;
    passwordHash?: string;
    photo?: string;
}

export async function patchbyId(request: FastifyRequest, reply: FastifyReply)  {
    const paramsSchema = z.object({
        id: z.coerce.number(), // Transforma a string da URL em número
    });

    const PatchBodySchema = z.object({
        name: z.string().trim().min(1).max(100).optional(),
        email: z.string().max(100).optional(),
        password: z.string().trim().min(3).max(30).optional(),
        picture: z.string().min(2).max(100).optional(),
    }); 

    const { id } = paramsSchema.parse(request.params)

    const { name, email, password, picture } = PatchBodySchema.parse(request.body);

    let objetoUtilizavel: PatchUserBody = {}

    if (name !== undefined) {
        objetoUtilizavel.name = name
    }

    if (email !== undefined) {
        objetoUtilizavel.email = email
    }

    if (password !== undefined) {
        objetoUtilizavel.passwordHash = password
    }

    if (picture !== undefined) {
        objetoUtilizavel.photo = picture
    }

    const user = await prisma.usuario.update({
        where:{
            id: id,
        },
        data: objetoUtilizavel,
    })

    return reply.status(201).send(user)
}