import { FastifyInstance } from "fastify";

  export default async function (fastify: FastifyInstance) {

    const estimate_opts = {
      schema: {
        request: {
          type: "object",
          properties: {
            name: {type: 'string', require: true},
            estimate: {type: 'string', require: true}
          }
        },
        response: {
          200: {
            type: 'object',
            properties: {
              message: { type: 'string' },
              estimate: {type: 'string'}
            }
          }
        }
      }
    }
  

    fastify.post("/estimate", estimate_opts,(request, response) => {
      const body = request.body
      console.log("987", body)
      response.send(body)
    });
   
  }

  