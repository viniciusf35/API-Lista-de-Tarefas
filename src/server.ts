import Fastify from "../node_modules/fastify/fastify";
import { rotas } from "./routes";
import ajvErrors from "ajv-errors";

const app = Fastify({
  ajv: {
    customOptions: {
      allErrors: true
    },
    plugins: [
      ajvErrors
    ]
  }});

const serverStart = async () => {
    try {
      await app.register(rotas)  
      await app.listen({port:3000})
    } catch (err) {
      app.log.error(err)
      process.exit(1)
    }
  }
  serverStart();
