import 'express-async-errors';

import { PingRouter, UserRouter } from '@routers';
import { errorHandler } from 'src/middlewares';

/**
 * Registers all routes and handles server errors.
 */

export default function registerRouters(app) {
	app.use('/ping', PingRouter);
	app.use('/user', UserRouter);

	app.use(errorHandler);
}
