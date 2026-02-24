import z from 'zod'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { makePatchPostUseCase } from '@/use-case/factories/post/make-patch-post-use-case.js';
import { PostPresenter } from '@/http/presenter/post-presenter.js';

export async function patchbyId(request: FastifyRequest, reply: FastifyReply)  {

    const paramsSchema = z.object({
        id: z.coerce.number(), // Transforma a string da URL em número
    });

    const PatchPostSchema = z.object({
        titulo: z.string().trim().min(1).max(100).optional(),
        Conteudo: z.string().trim().min(1).max(1000).optional(),
    }); 

    const { id } = paramsSchema.parse(request.params)

    const { titulo, Conteudo } = PatchPostSchema.parse(request.body);

    const patchPostUseCase = makePatchPostUseCase()
    const { post } = await patchPostUseCase.execute(id, {
        titulo,
        Conteudo,
    })

    return reply.status(200).send(PostPresenter.toHTTP(post))
}