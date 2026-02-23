import z from 'zod'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { DeleteUserUseCase } from '@/use-case/user/delete-users.js';

export async function deleteUserbyEmail (request: FastifyRequest, reply: FastifyReply){
    const deleteBodySchema = z.object({
        email: z.string().trim().min(1).max(100),
    }); 

    const { email } = deleteBodySchema.parse(request.params);

   const { user } = await new DeleteUserUseCase().execute(email)

    return reply.status(201).send({
        message: "Usuário deletado com sucesso!",
        usuarioDeletado: user
    })
}