import z from 'zod'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeDeleteUserUseCase } from '@/use-case/factories/user/delete-user-use-case.js';

export async function deleteUserbyEmail (request: FastifyRequest, reply: FastifyReply){
    const deleteBodySchema = z.object({
        email: z.string().trim().min(1).max(100),
    }); 

    const { email } = deleteBodySchema.parse(request.params);

    const deleteUserUseCase = makeDeleteUserUseCase()
    const { user } = await deleteUserUseCase.execute(email)

    return reply.status(201).send({
        message: "Usuário deletado com sucesso!",
        usuarioDeletado: user
    })
}