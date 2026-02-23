import z from 'zod'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js';
import { DeleteUserUseCase } from '@/use-case/user/delete-users.js';

export async function deleteUserbyEmail (request: FastifyRequest, reply: FastifyReply){
    const deleteBodySchema = z.object({
        email: z.string().trim().min(1).max(100),
    }); 

    const { email } = deleteBodySchema.parse(request.params);

    const usersRepository = new PrismaUsersRepository()
    const { user } = await new DeleteUserUseCase(usersRepository).execute(email)

    return reply.status(201).send({
        message: "Usuário deletado com sucesso!",
        usuarioDeletado: user
    })
}