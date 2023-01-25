import Fastify from 'fastify';

const server = Fastify()

async function main() {
    try {
        await server.listen({port: 3000})
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

main()