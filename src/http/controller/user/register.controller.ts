import z from 'zod'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { RegisterUserUseCase } from '@/use-case/user/register-users.js'

export async function register(request: FastifyRequest, reply: FastifyReply)  {
    const registerBodySchema = z.object({
        name: z.string().trim().min(1).max(100),
        email: z.email().max(100),
        password: z.string().trim().min(3).max(30),
        picture: z.string().max(100).optional(),
    }); 

    const { name, email, password, picture } = registerBodySchema.parse(request.body);

    const { user } = await new RegisterUserUseCase().execute({
        name,
        email,
        password,
        picture: picture ?? ""
    })

    return reply.status(201).send({
        message:"Usuário criado com sucesso",
        user,
    })
}