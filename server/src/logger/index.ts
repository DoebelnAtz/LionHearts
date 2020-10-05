const { createLogger, transports, format } = require('winston');

export const accessLogger = createLogger({
	format: format.combine(
		format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
		format.printf(
			(info: { timestamp: any; level: any; message: any }) =>
				`${info.timestamp} ${info.level}: ${info.message}`,
		),
	),
	transports: [
		new transports.File({
			filename: './logs/access.log',
			json: false,
			maxsize: 10000,
			maxFiles: 5,
		}),
		new transports.Console(),
	],
});

export const errorLogger = createLogger({
	format: format.combine(
		format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
		format.printf(
			(info: { timestamp: any; level: any; message: any }) =>
				`${info.timestamp} ${info.level}: ${info.message}`,
		),
	),
	transports: [
		new transports.File({
			filename: './logs/error.log',
			json: false,
			maxsize: 10000,
			maxFiles: 5,
		}),
		new transports.Console(),
	],
});

module.exports = { accessLogger: accessLogger, errorLogger: errorLogger };
