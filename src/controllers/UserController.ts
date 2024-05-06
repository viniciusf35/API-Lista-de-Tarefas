import { FastifyRequest, FastifyReply } from "fastify";
import { User } from "../services/UserService";
import { Auth } from "../services/AuthService";

class UserController {
    private UserService: User;
    private AuthService: Auth;

    constructor() {
        this.UserService = new User();
        this.AuthService = new Auth();
    }

    /**
     * Registra um novo usuário se o email não estiver em uso e cria um hash para a senha.
     */
    async register(request: any, reply: FastifyReply) {
        const { name, email, password } = request.body;
        const existingUser = await this.UserService.findByEmail(email);
        if (existingUser) {
            return reply.status(401).send({ message: 'Email já existente.' });
        }

        const hashedPassword = await this.AuthService.hashedPassword(password);
        const newUser = await this.UserService.createUser(name, email, hashedPassword);
        reply.send({ message: 'Usuário registrado com sucesso', user: newUser });
    }

    /**
     * Autentica um usuário com email e senha, retornando um token JWT se as credenciais forem válidas.
     */
    async login(request: any, reply: FastifyReply) {
        const { email, password } = request.body;
        const user = await this.UserService.findByEmail(email);
        if (!user) {
            return reply.status(401).send({ message: 'Usuário não encontrado.' });
        }

        const passwordMatch = await this.AuthService.passwordMatch(password, user.password);
        if (!passwordMatch) {
            return reply.status(401).send({ message: 'Credenciais inválidas.' });
        }

        const token = await this.AuthService.createToken(user.id, user.email);
        reply.send({ token });
    }

    /**
     * Atualiza o nome do usuário usando o ID obtido do token de autenticação.
     */
    async updateName(request: any, reply: FastifyReply) {
        const { name } = request.body;
        const result = await this.UserService.updateName(request.userId, name);
        if (!result) {
            return reply.status(404).send({ message: 'Usuário não encontrado.' });
        }

        reply.send(result);
    }

    /**
     * Atualiza a senha do usuário, exigindo verificação da senha atual antes de alterá-la.
     */
    async updatePassword(request: any, reply: FastifyReply) {
        const user = await this.UserService.findById(request.userId);
        if (!user) {
            return reply.status(401).send({ message: 'Usuário não encontrado.' });
        }

        const { password, newPassword } = request.body;
        if (!password || !newPassword) {
            return reply.status(400).send({ message: 'Senha atual e nova senha são obrigatórias.' });
        }

        const passwordMatch = await this.AuthService.passwordMatch(password, user.password);
        if (!passwordMatch) {
            return reply.status(401).send({ message: 'Senha atual incorreta.' });
        }

        if (await this.AuthService.passwordMatch(newPassword, user.password)) {
            return reply.status(400).send({ message: 'A nova senha deve ser diferente da senha atual.' });
        }

        const hashedNewPassword = await this.AuthService.hashedPassword(newPassword);
        await this.UserService.updatePassword(user.id, hashedNewPassword);
        reply.send({ message: 'Senha trocada com sucesso!' });
    }

}

export { UserController };
