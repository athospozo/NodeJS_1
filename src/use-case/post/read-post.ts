import type { Post } from "@/@types/prisma/client.js"
import { prisma } from "@/libs/prisma.js"
  
type GetPostUseCaseResponse = {
    post: Post
}   
    
export class ReadPostById{
    async execute ( id: number ): Promise<GetPostUseCaseResponse>{

        let post = await prisma.post.findUnique({
            where:{
                id: id,
            },
        })

        if (!post) throw new Error ("Post não existe!")

        return { post }
    }
}