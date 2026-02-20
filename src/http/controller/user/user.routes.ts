import type { FastifyInstance } from 'fastify';
import { register } from './register.js';
import { showAll } from './showall.js';
import { deleteUserbyEmail } from './deletebyEmail.js';


export async function usersRoutes (app: FastifyInstance) {
    app.post('/', register)
    app.get('/', showAll)
    app.delete('/', deleteUserbyEmail)
}