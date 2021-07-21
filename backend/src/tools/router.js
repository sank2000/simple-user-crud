import 'express-async-errors';

import { PingRouter } from '@routers';
import { errorHandler } from 'src/middlewares';

/**
 * Registers all routes and handles server errors.
 */

export default function registerRouters(app) {
	app.use('/ping', PingRouter);

	app.use(errorHandler);
}
