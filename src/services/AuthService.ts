import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class Auth {
    /**
     * Compara a senha fornecida com a senha hash armazenada.
     */
    async passwordMatch(password: string, userPassword: string) {
        return bcrypt.compare(password, userPassword);
    }

    /**
     * Cria um token JWT que expira em 5 dias.
     */
    async createToken(id: number, email: string) {
        const secretKey = 'segredo-do-jwt'; // Mantenha isso seguro.
        return jwt.sign({ id, email }, secretKey, { expiresIn: '5d' });
    }

    /**
     * Gera um hash para a senha usando bcrypt com um salto de 10 rodadas.
     */
    async hashedPassword(password: string) {
        return bcrypt.hash(password, 10);
    }
}

export { Auth };
