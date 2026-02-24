import type { FastifyInstance } from 'fastify';
import { register } from './register.controller.js';
import { showAll } from './showall.js';
import { deleteUserbyEmail } from './deletebyEmail.controller.js';
import { patchbyId } from './patchbyId.controller.js';
import { readbyId } from './readUserById.controller.js';
import { authenticate } from './authenticate.controller.js';


export async function usersRoutes (app: FastifyInstance) {
    app.post('/', register)
    app.post('/authenticate', authenticate)
    
    app.get('/', showAll)
    app.delete('/:email', deleteUserbyEmail)
    app.patch('/:id', patchbyId)
    app.get('/:id', readbyId)
}