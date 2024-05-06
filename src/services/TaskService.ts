import { prisma } from "../prisma/index";

class Task {
    /**
     * Retorna todas as tarefas de um usuário específico.
     */
    async getAllTasks(user_id: number) {
        return prisma.tasks.findMany({
            where: { user_id }
        });
    }

    /**
     * Cria uma nova tarefa para um usuário.
     */
    async createTask(name: string, description: string, user_id: number) {
        return prisma.tasks.create({
            data: { name, description, user_id, create_date: new Date() }
        });
    }

    /**
     * Remove uma tarefa pelo ID.
     */
    async deleteTask(id: number) {
        return prisma.tasks.delete({
            where: { id }
        });
    }

    /**
     * Atualiza o nome e descrição de uma tarefa.
     */
    async updateTask(id: number, name: string, description: string) {
        return prisma.tasks.update({
            where: { id },
            data: { name, description }
        });
    }

    /**
     * Busca uma tarefa pelo ID.
     */
    async getById(id: number) {
        return prisma.tasks.findUnique({
            where: { id }
        });
    }
}

export { Task };
