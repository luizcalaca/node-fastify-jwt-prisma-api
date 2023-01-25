import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import userRoutes from './modules/user/user.route';
import { userSchemas } from './modules/user/user.schema';
import fjwt, { JWT } from "@fastify/jwt";

declare module "fastify" {
    interface FastifyRequest {
      jwt: JWT;
    }
    export interface FastifyInstance {
      authenticate: any;
    }
}

export const server = Fastify()

server.register(fjwt, {
    secret: "aowldpowierçalskd"
})

server.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (e) {
        return reply.send(e);
      }
    }
  );

server.get('/healthcheck', async function (request, response) {
    return {status: "OK"}
})

async function main() {

    for (const schema of userSchemas) {
        server.addSchema(schema)
    }
    server.register(userRoutes, {prefix: 'api/users'})

    try {
        await server.listen({port: 3000})
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

main()