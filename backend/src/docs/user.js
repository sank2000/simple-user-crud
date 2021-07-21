import j2s from 'joi-to-swagger';

import { idValidator, baseUser, updateUser } from 'src/validators';

const { swagger: idSchema } = j2s(idValidator);
const { swagger: baseSchema } = j2s(baseUser);
const { swagger: UpdateSchema } = j2s(updateUser);

export default {
	'/user/': {
		get: {
			tags: ['user'],
			summary: 'get all users',
			description: 'get a list of all users',
			responses: {
				200: {
					description: 'list of users'
				},
				404: {
					description: 'No users found'
				}
			}
		},
		post: {
			tags: ['user'],
			summary: 'create an users',
			description: 'create a new user for client',
			parameters: [
				{
					in: 'body',
					name: 'body',
					description: 'user object that needs to be created',
					required: false,
					schema: {
						...baseSchema,
						example: {
							name: 'Santhosh',
							email: 'santhoshvelr@gmail.com',
							phoneNumber: '6382878078'
						}
					}
				}
			],
			responses: {
				200: {
					description: 'created successfully'
				},
				400: {
					description: 'Missing fields'
				}
			}
		},
		put: {
			tags: ['user'],
			summary: 'update an users',
			description: 'update an user of amount and status',
			parameters: [
				{
					in: 'body',
					name: 'body',
					description: 'object with amount and id',
					required: false,
					schema: {
						...UpdateSchema,
						example: {
							id: '60f5583c5c61c0927485a89d',
							name: 'update'
						}
					}
				}
			],
			responses: {
				200: {
					description: 'updated successfully'
				},
				404: {
					description: 'user not found'
				}
			}
		},
		delete: {
			tags: ['user'],
			summary: 'delete an users',
			description: 'delete an user',
			parameters: [
				{
					in: 'body',
					name: 'body',
					description: 'object with amount and id',
					required: false,
					schema: {
						...idSchema,
						example: {
							id: '60f5583c5c61c0927485a89d'
						}
					}
				}
			],
			responses: {
				200: {
					description: 'deleted successfully'
				},
				404: {
					description: 'user not found'
				}
			}
		}
	}
};
