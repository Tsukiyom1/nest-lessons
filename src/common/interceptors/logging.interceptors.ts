import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class LoggingInterceptors implements NestInterceptor {
	intercept(
		context: ExecutionContext,
		next: CallHandler<any>,
	): Observable<any> {
		const now = Date.now();

		const request = context.switchToHttp().getRequest();
		const { method, url } = request;

		return next.handle().pipe(
			tap(() => {
				const ms = Date.now() - now;
				console.log(`${method},${url} - ${ms} ms`);
			}),
		);
	}
}
