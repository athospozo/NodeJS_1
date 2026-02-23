import { prisma } from "@/libs/prisma.js"

export class ShowAllPostsUseCase {
    async execute (): Promise<any> {
        const posts = await prisma.post.findMany()

        return posts
    }
}