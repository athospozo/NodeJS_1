import z from 'zod'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeDeletePostUseCase } from '@/use-case/factories/post/make-delete-post-use-case.js';
import { PostPresenter } from '@/http/presenter/post-presenter.js';
import { PostDoesntexist } from '@/use-case/errors/post-does-not-exist.js';

export async function deletePostbyId (request: FastifyRequest, reply: FastifyReply){
    try{

        const paramSchema = z.object({
            publicId: z.coerce.string(),
        }); 
        
        const { publicId } = paramSchema.parse(request.params)

        const deletePostUseCase = makeDeletePostUseCase()
        const { post } = await deletePostUseCase.execute(publicId)

        return reply.status(200).send({
            message: "Post deletado com sucesso!",
            postDeletado: PostPresenter.toHTTP(post)
        })
    
    }catch (error) {
        if (error instanceof PostDoesntexist) {
            return reply.status(404).send({ message: error.message })
        }
        throw error
    }
}