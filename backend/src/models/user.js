import { Schema, model } from 'mongoose';

const User = new Schema(
	{
		name: { type: String, required: true },
		phoneNumber: { type: Number, min: 4444444444, max: 9999999999, required: true },
		email: { type: String, required: true, unique: true }
	},
	{
		timestamps: true
	}
);

export default model('user', User);
