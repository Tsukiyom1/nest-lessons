import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export class LoggingMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		const now = Date.now();
		const { originalUrl, method } = req;
		console.log(
			`В это время ${now.toString()} был отправлен запрос ${method} с такого url ${originalUrl} `,
		);
		next();
	}
}
