import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { UserController } from "./controllers/UserController";
import { TaskController } from "./controllers/TaskController";
import { authenticator } from "./middleware/AuthMiddleware";
import { UserSchemas, TaskSchemas } from "./schemas/validator-schema";

async function rotas(fastify: FastifyInstance) {
    const userController = new UserController();
    const taskController = new TaskController();

    // Retorna mensagem de boas-vindas.
    fastify.get('/', async (request, reply) => {
        return { message: 'API lista de tarefas'};
    });

    // Login de usuário.
    fastify.post('/login', { schema: UserSchemas.login },
     (request, reply) => userController.login(request, reply));

    // Registro de novo usuário.
    fastify.post('/register', { schema: UserSchemas.register },
     (request, reply) => userController.register(request, reply));

    // Atualiza nome do usuário, requer autenticação.
    fastify.put('/name', { preHandler: authenticator, schema: UserSchemas.updateName },
     (request, reply) => userController.updateName(request, reply));

    // Atualiza senha do usuário, requer autenticação.
    fastify.put('/password', { preHandler: authenticator, schema: UserSchemas.updatePassword },
     (request, reply) => userController.updatePassword(request, reply));

    // Obtém tarefa por ID, requer autenticação.
    fastify.get('/tasks/:id', { preHandler: authenticator, schema: TaskSchemas.getUnique },
     (request, reply) => taskController.getUnique(request, reply));

    // Cria nova tarefa, requer autenticação.
    fastify.post('/tasks', { preHandler: authenticator, schema: TaskSchemas.create },
     (request, reply) => taskController.create(request, reply));

    // Lista todas tarefas, requer autenticação.
    fastify.get('/tasks', { preHandler: authenticator },
     (request, reply) => taskController.getAll(request, reply));

    // Deleta tarefa por ID, requer autenticação.
    fastify.delete('/tasks/:id', { preHandler: authenticator, schema: TaskSchemas.delete },
     (request, reply) => taskController.delete(request, reply));

    // Atualiza tarefa por ID, requer autenticação.
    fastify.put('/tasks/:id', { preHandler: authenticator, schema: TaskSchemas.update },
     (request, reply) => taskController.update(request, reply));
}

export { rotas };
