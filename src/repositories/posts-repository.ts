import type { Prisma, Post } from "@/@types/prisma/client.js";

export interface PostsRepository {
    create(data: Prisma.PostUncheckedCreateInput): Promise<Post>
    findById(id: number): Promise<Post | null>
    update(id: number, data: Prisma.PostUpdateInput): Promise<Post>
    delete(id: number): Promise<Post>
    findAll(): Promise<Post[] | null>
    FindFromUser(IdUser: number): Promise<Post[] | null>
}