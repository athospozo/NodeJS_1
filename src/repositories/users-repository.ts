import type { Prisma, Usuario } from "@/@types/prisma/client.js";

export interface UsersRepository {
    create(data: Prisma.UsuarioCreateInput): Promise<Usuario>
    findById(id: number): Promise<Usuario | null>
    findByEmail(email: string): Promise<Usuario | null>
    update(id: number, data: Prisma.UsuarioUpdateInput): Promise<Usuario>
    delete(email: string): Promise<Usuario>
    findAll(): Promise<Usuario[] | null>
}