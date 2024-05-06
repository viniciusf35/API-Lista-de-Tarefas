import { FastifyRequest, FastifyReply } from "fastify";
import { Task } from "../services/TaskService";

class TaskController {
  private TaskService: Task;

  constructor() {
    this.TaskService = new Task();
  }

  /**
   * Busca uma tarefa única pelo ID e verifica se o usuário tem permissão para acessá-la.
   */
  async getUnique(request: any, reply: FastifyReply) {
    const task = await this.TaskService.getById(request.params.id);
    if (!task) {
      return reply.status(404).send({ message: "Tarefa não encontrada" });
    }
    if (task.user_id !== request.userId) {
      return reply.status(403).send({ message: "Acesso negado" });
    }
    reply.send(task);
  }

  /**
   * Cria uma nova tarefa com os dados fornecidos pelo usuário.
   */
  async create(request:any, reply: FastifyReply) {
    const { name, description } = request.body;
    const task = await this.TaskService.createTask(name, description, request.userId);
    return reply.send(task);
  }

  /**
   * Retorna todas as tarefas do usuário autenticado.
   */
  async getAll(request: any, reply: FastifyReply) {
    const tasks = await this.TaskService.getAllTasks(request.userId);
    return reply.send(tasks);
  }

  /**
   * Exclui uma tarefa específica, verificando permissões antes de proceder.
   */
  async delete(request: any, reply: FastifyReply) {
    const task = await this.TaskService.getById(request.params.id);
    if (!task) {
      return reply.status(404).send({ message: "Tarefa não encontrada" });
    }
    if (task.user_id !== request.userId) {
      return reply.status(403).send({ message: "Acesso negado" });
    }
    await this.TaskService.deleteTask(request.params.id);
    return reply.send({ message: `Tarefa ${task.name} deletada com sucesso!` });
  }

  /**
   * Atualiza os detalhes de uma tarefa existente, verificando primeiro se o usuário tem permissão.
   */
  async update(request: any, reply: FastifyReply) {
    const { name, description } = request.body;
    const task = await this.TaskService.getById(request.params.id);
    if (!task) {
      return reply.status(404).send({ message: "Tarefa não encontrada" });
    }
    if (task.user_id !== request.userId) {
      return reply.status(403).send({ message: "Acesso negado" });
    }
    const updatedTask = await this.TaskService.updateTask(request.params.id, name, description);
    return reply.send(updatedTask);
  }
}

export { TaskController };
