import { prisma } from "../prisma/index";

class User {
    /**
     * Cria um novo usuário.
     */
    async createUser(name: string, email: string, password: string) {
        return prisma.user.create({
            data: { name, email, password },
            select: { id: true, name: true, email: true }
        });
    }

    /**
     * Busca um usuário pelo email.
     */
    async findByEmail(email: string) {
        return prisma.user.findUnique({
            where: { email },
        });
    }

    /**
     * Busca um usuário pelo ID.
     */
    async findById(id: number) {
        return prisma.user.findUnique({
            where: { id },
        });
    }

    /**
     * Atualiza o nome de um usuário.
     */
    async updateName(id: number, name: string) {
        return prisma.user.update({
            where: { id },
            data: { name },
            select: { id: true, name: true, email: true },
        });
    }

    /**
     * Atualiza a senha de um usuário.
     */
    async updatePassword(id: number, newPassword: string) {
        return prisma.user.update({
            where: { id },
            data: { password: newPassword },
        });
    }
}

export { User };
