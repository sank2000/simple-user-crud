import Joi from 'joi';
import JoiObjectId from 'joi-objectid';

Joi.objectID = JoiObjectId(Joi);

export const baseUser = Joi.object({
	name: Joi.string().required(),
	phoneNumber: Joi.number().min(4444444444).max(9999999999).required().messages({
		'number.min': '"Phone number" must be valid',
		'number.max': '"Phone number" must be valid'
	}),
	email: Joi.string()
		.email({ tlds: { allow: false } })
		.required()
});

export const idValidator = Joi.object().keys({
	id: Joi.objectID().required().messages({
		'string.pattern.name': '{{#label}} must be valid'
	})
});

export const updateUser = idValidator
	.keys({
		name: Joi.string().optional(),
		phoneNumber: Joi.number().min(4444444444).max(9999999999).optional().messages({
			'number.min': '"Phone number" must be valid',
			'number.max': '"Phone number" must be valid'
		}),
		email: Joi.string()
			.email({ tlds: { allow: false } })
			.optional()
	})
	.or('phoneNumber', 'email', 'name')
	.required()
	.messages({
		'object.missing': 'No fields specified'
	});
