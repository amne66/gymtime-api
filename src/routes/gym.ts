import { FastifyInstance } from 'fastify';
import { Static, Type } from '@sinclair/typebox';
import { upsertGFymController } from '../controller/gym';

const gym = Type.Object({
	id: Type.String({format:"uuid"}),
	name : Type.String()
});
type gym = Static<typeof gym>;

const GetGymQuery = Type.Object({
	name: Type.Optional(Type.String()),
});
type GetGymQuery = Static<typeof GetGymQuery>;

let gyms:gym[] =[
{id:"93b4e766-6f8e-46a5-85b2-21d3ce510bba",name:"fitness time"},
{id:"8a4e9ade-86f8-4517-a746-5831266120ec",name:"NuYu"}
];

export default async function (server: FastifyInstance) {

    server.route({
		method: 'PUT',
		url: '/gyms',
		schema: {
			summary: 'Creates new gym + all properties are required',
			tags: ['gym'],
			body: gym,
		},
		handler: async (request, reply) => {
			const newGym: any = request.body;
			return upsertGFymController(gyms, newGym);
		},
	});

	server.route({
		method: 'PATCH',
		url: '/contacts/:id',
		schema: {
			summary: 'Update a gym by id + you dont need to pass all properties',
			tags: ['gym'],
			body: Type.Partial(gym),
			params: Type.Object({
				id: Type.String({ format: 'uuid' }),
			}),
		},
		handler: async (request, reply) => {
			const newGym: any = request.body;
			return upsertGFymController(gyms, newGym);
		},
	});
    
	server.route({
		method: 'DELETE',
		url:'/gym/:id',
		schema: {
			summary: 'Deletes a gyme',
			tags: ['gym'],
			params: Type.Object({
				id: Type.String({ format: 'uuid' }),
			}),
		},
		
		handler: async (request, reply) => {
			const id = (request.params as any).id as string;
			gyms = gyms.filter((c) => c.id !== id);
			return gyms;		
		}
	});

	server.route({
		method: 'GET',
		url: '/gyms',
		schema: {
			summary: 'Gets all gyms',
			tags: ['gyms'],
			querystring: GetGymQuery,
			response: {
				'2xx': Type.Array(gym),
			},
		},
		handler: async (request, reply) => {
			const query = request.query as GetGymQuery;

			if (query.name) {
				return gyms.filter((c) => c.name.includes(query.name ?? ''));
			} else {
				return gyms;
			}
		},
	});
}
