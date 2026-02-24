import z from 'zod'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { makePatchUserUseCase } from '@/use-case/factories/user/make-patch-user-use-case.js';

export async function patchbyId(request: FastifyRequest, reply: FastifyReply)  {

    // identificanddo o id da deleção:
    const paramsSchema = z.object({
        id: z.coerce.number(), // Transforma a string da URL em número
    });

    // recolhendo os dados a serem deletados:
    const PatchBodySchema = z.object({
        name: z.string().trim().min(1).max(100).optional(),
        email: z.string().max(100).optional(),
        password: z.string().trim().min(3).max(30).optional(),
        picture: z.string().min(2).max(100).optional(),
    }); 

    const { id } = paramsSchema.parse(request.params)

    const { name, email, password, picture } = PatchBodySchema.parse(request.body);

    const patchUserUseCase = makePatchUserUseCase()
    const { user } = await patchUserUseCase.execute(id, {
        name,
        email,
        passwordHash: password,
        photo: picture
    })

    return reply.status(201).send(user)
}