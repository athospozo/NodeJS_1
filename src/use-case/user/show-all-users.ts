import { prisma } from "@/libs/prisma.js"

export class ShowAllUsersUseCase {
    async execute (): Promise<any> {
        const usuarios = await prisma.usuario.findMany()

        return usuarios
    }
}