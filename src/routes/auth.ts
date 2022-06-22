import { FastifyInstance } from "fastify";


export default async function (server: FastifyInstance) {
	
    server.route({
		method: 'POST',
		url: '/signup',
		schema: {
			summary: 'sign up',
			tags: ['authentication']
		},
		handler: async (request, reply) => {
			
			return {msg:"done successfully"};
		},
	});
    
    server.route({
		method: 'POST',
		url: '/login',
		schema: {
			summary: 'log in',
			tags: ['authentication']
		},
		handler: async (request, reply) => {
			
			return {msg:"done successfully"};
		},
	}); 
}