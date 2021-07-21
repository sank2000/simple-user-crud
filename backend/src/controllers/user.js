import { User } from '@models';

import { sendSuccess, sendFailure } from 'src/helpers';

export const createUser = async (req, res) => {
	const { body } = req;

	const user = new User({ ...body });
	await user.save();

	return sendSuccess(res, { message: 'User created successfully', data: user });
};

export const getUsers = async (req, res) => {
	const users = await User.find({});

	if (users.length === 0) {
		return sendFailure(res, { error: 'users not found' }, 404);
	}

	return sendSuccess(res, { data: users });
};

export const getUserById = async (req, res) => {
	const { id } = req.param;

	const user = await User.findById(id);

	if (!user) {
		return sendFailure(res, { error: 'user not found' }, 404);
	}

	return sendSuccess(res, { data: user });
};

export const updateUserById = async (req, res) => {
	const { body } = req;

	const { id, ...rest } = body;

	const user = await User.findByIdAndUpdate(id, { ...rest }, { new: true });

	if (!user) {
		return sendFailure(res, { error: 'user not found' }, 404);
	}

	return sendSuccess(res, { message: 'Updated successfully', data: user });
};

export const deleteUser = async (req, res) => {
	const { id } = req.body;

	const user = await User.findByIdAndDelete(id);

	if (!user) {
		return sendFailure(res, { error: 'user not found' }, 404);
	}

	return sendSuccess(res, { message: 'Deleted successfully' });
};
