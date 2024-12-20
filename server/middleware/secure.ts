import { secureHeaders } from 'hono/secure-headers'
import { IS_DEV } from './misc.ts'

export const secureHeadersMiddleware = secureHeaders({
	referrerPolicy: 'same-origin',
	crossOriginEmbedderPolicy: false,
	contentSecurityPolicy: {
		connectSrc: [
			IS_DEV ? 'ws:' : null,
			process.env.SENTRY_DSN ? '*.sentry.io' : null,
			"'self'",
		].filter(Boolean),
		fontSrc: ["'self'"],
		frameSrc: ["'self'"],
		imgSrc: ["'self'", 'data:'],
		mediaSrc: ["'self'", 'data:'],
		scriptSrc: [
			"'strict-dynamic'",
			"'self'",
			(c, _) => `'nonce-${c.get('cspNonce')}'`,
		],
		scriptSrcAttr: [(c, _) => `'nonce-${c.get('cspNonce')}'`],
		//upgradeInsecureRequests: undefined,
	},
})
