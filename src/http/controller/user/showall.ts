import { prisma } from '@/libs/prisma.js'
import type { FastifyRequest, FastifyReply } from 'fastify'

export async function showAll(request: FastifyRequest, reply: FastifyReply) {
    const usuarios = await prisma.usuario.findMany();

    return reply.status(200).send(usuarios);
} 
