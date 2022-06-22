import { FastifyInstance } from 'fastify';
import { Static, Type } from '@sinclair/typebox';
import { insertCommentController } from '../controller/comment';

const comment = Type.Object({
	id: Type.String({format:"uuid"}),
	comment : Type.String()
});
type comment = Static<typeof comment>;



let comments :comment[] =[
{id:"93b4e766-6f8e-46a5-85b2-21d3ce510bbd",comment:"good gym"},
{id:"8a4e9ade-86f8-4517-a746-5831266120ef",comment:"bad gym"}
];

export default async function (server: FastifyInstance) {
	
	server.route({
		method: 'PUT',
		url: '/comments',
		schema: {
			summary: 'respond to users inquiries',
			tags: ['admin'],
			body: comment,
		},
		handler: async (request, reply) => {
			const newComment: any = request.body;
			return insertCommentController(comments, newComment);
		},
	});
	
	
	
	server.route({
		method: 'DELETE',
		url:'/comment/:id',
		schema: {
			summary: 'Deletes a comment',
			tags: ['admin'],
			params: Type.Object({
				id: Type.String({ format: 'uuid' }),
			}),
		},
		
		handler: async (request, reply) => {
			const id = (request.params as any).id as string;
			comments = comments.filter((c) => c.id !== id);
			return comments;		
		}
	});}