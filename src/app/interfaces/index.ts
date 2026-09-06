export interface IRequestUser {
	userId: string;
	email: string;
	role: string;
	fullName?: string;
}

declare global {
	namespace Express {
		interface Request {
			user?: IRequestUser;
		}
	}
}
