import { StatusCodes } from 'http-status-codes';

export const sendSuccess = (res, body) => {
	return res.status(StatusCodes.OK).json(body);
};

export const sendFailure = (res, body, code = StatusCodes.BAD_REQUEST) => {
	return res.status(code).json(body);
};

export const validateBody = (validator, params = false) => {
	return (req, res, next) => {
		const { error } = validator.validate(params ? req.params : req.body);
		if (error) return sendFailure(res, { error: error.details[0].message });

		next();
	};
};
