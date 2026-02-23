import type { FastifyInstance } from 'fastify';
import { register } from './register.controller.js';
import { showAll } from './showall.js';
import { deleteUserbyEmail } from './deletebyEmail.controller.js';
import { patchbyId } from './patchbyId.controller.js';
import { readbyId } from './readUserById.controller.js';


export async function usersRoutes (app: FastifyInstance) {
    app.post('/', register)
    app.get('/', showAll)
    app.delete('/:email', deleteUserbyEmail)
    app.patch('/:id', patchbyId)
    app.get('/:id', readbyId)
}