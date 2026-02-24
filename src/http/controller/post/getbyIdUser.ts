import z from 'zod'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { makeShowByIdUserUseCase } from '@/use-case/factories/post/make-show-by-id-user.js';
import { PostPresenter } from '@/http/presenter/post-presenter.js';
import { UserDoesntexist } from '@/use-case/errors/user-does-not-exist.js';

export async function getbyIdUsers(request: FastifyRequest, reply: FastifyReply) {
    try{

        const paramsSchema = z.object({
            iduser: z.coerce.number(), 
        });

        const { iduser } = paramsSchema.parse(request.params)

        const postsUserUseCase = makeShowByIdUserUseCase()
        const posts = await postsUserUseCase.execute(iduser)

        return reply.status(200).send(PostPresenter.toHTTP(posts))

    }catch (error) {
        if (error instanceof UserDoesntexist) {
            return reply.status(404).send({ message: error.message })
        }
        throw error
    }
}