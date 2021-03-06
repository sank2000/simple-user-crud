import config from 'config';
import helmet from 'helmet';
import cors from 'cors';
import { rateLimiter } from '@middlewares';

/**
 * Adds helmet and request rate limiting middlewares in production environment.
 */

export default function registerPreprocessor(app) {
	if (config.util.getEnv('NODE_ENV') === 'production') {
		app.use(helmet());
		app.use(rateLimiter);
	}
	app.use(cors());
}
