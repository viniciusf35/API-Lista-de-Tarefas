import jwt from "jsonwebtoken";
import { FastifyRequest, FastifyReply } from "fastify";
import { User } from "../services/UserService";

declare module 'fastify' {
    interface FastifyRequest {
        userId: number;
    }
}

/**
 * Middleware que verifica a autenticidade de um token JWT e recupera o usuário associado.
 */
const authenticator = async (request: any, reply: FastifyReply) => {
    try {
        const token = request.headers.authorization?.split(" ")[1]; // Extrai o token do cabeçalho de autorização.
        if (!token) {
            throw new Error("Token não fornecido");
        }

        const decodedToken: any = jwt.verify(token, "segredo-do-jwt"); // Verifica o token com a chave secreta.
        const userClass = new User();
        const user = await userClass.findByEmail(decodedToken.email); // Busca usuário pelo email extraído do token.

        if (!user) {
            throw new Error("Usuário não encontrado com o token fornecido");
        }

        request.email = user.email; // Define o email no objeto request.
        request.userId = decodedToken.id; // Define o ID do usuário no objeto request.

    } catch (error) {
        
        reply.code(401).send({ message: "Token inválido" }); // Responde com erro se o token for inválido.
    }
};

export { authenticator };
