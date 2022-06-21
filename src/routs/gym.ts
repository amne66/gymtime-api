import { FastifyInstance } from 'fastify';


export default async function (server: FastifyInstance) {
	server.route({
		method: 'PUT',
		url: '/gme/insert',
		schema: {
			summary: 'insert a gym',
			tags: ['gym'],
			body: {},
		},
		handler: async (request, reply) => {
			return {msg:"done successfully"};
		},
	});

	server.route({
		method: 'DELETE',
		url: '/gym/:id',
		schema: {
			summary: 'Deletes a gyme',
			tags: ['gym'],
		},
		handler: async (request, reply) => {
			return {msg:"done successfully"};
		},
	});

	server.route({
		method: 'GET',
		url: '/gyms',
		schema: {
			summary: 'Gets all gyms',
			tags: ['gym'],
		},
		handler: async (request, reply) => {
			return {msg:"done successfully"};
		},
	});
}
