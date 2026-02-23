import type { Prisma } from "@/@types/prisma/client.js";
import type { UsersRepository } from "../users-repository.js";
import { prisma } from "@/libs/prisma.js";


export class PrismaUsersRepository implements UsersRepository {
    async create(data: Prisma.UsuarioCreateInput) {
        return await prisma.usuario.create({ data })
    }

    async findById(id: number) {
        return await prisma.usuario.findFirst({
            where: {
                id,
            }
        })
    } 

    async findByEmail(email: string) {
        return await prisma.usuario.findFirst({
            where: {    
                email,
            }
        })
    }

    async update(id: number, data: Prisma.UsuarioUpdateInput) {
        return await prisma.usuario.update({
            where: {
                id
            },
            data
        })
    }

    async delete(email: string) {
        return await prisma.usuario.delete({
            where: {
                email
            }
        })
    } 
    
    async findAll() {
        return await prisma.usuario.findMany()
    }
}