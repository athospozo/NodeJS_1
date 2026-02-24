import type { Prisma } from "@/@types/prisma/client.js";
import type { PostsRepository } from "../posts-repository.js";
import { prisma } from "@/libs/prisma.js";


export class PrismaPostsRepository implements PostsRepository {
    async create(data: Prisma.PostUncheckedCreateInput) {
        return await prisma.post.create({ data })  
    }

    async findById(id: number) {
        return await prisma.post.findFirst({
            where: { id }
        })
    }

    async findBy(where: Prisma.PostWhereUniqueInput) {
        return await prisma.post.findUnique({
            where
        })
    }

    async update(id: number, data: Prisma.PostUpdateInput) {
        return await prisma.post.update({
            where: { id },
            data
        })
    }

    async delete(id: number) {
        return await prisma.post.delete({
            where: { id }
        })
    }   

    async findAll() {
        return await prisma.post.findMany()
    }

    async FindFromUser(IdUser: number) {
        return await prisma.post.findMany({
            where: {
                autorId: IdUser
            }
        })
    }
}