import jwt, {
	type JwtPayload,
	type Secret,
	type SignOptions,
} from "jsonwebtoken";

export interface IVerifyTokenResult {
	success: boolean;
	data: JwtPayload | null;
	error: string | null;
}

const createToken = (
	payload: JwtPayload,
	secret: Secret,
	options?: SignOptions,
): string => {
	return jwt.sign(payload, secret, options);
};

const verifyToken = (token: string, secret: Secret): IVerifyTokenResult => {
	try {
		const decodedPayload = jwt.verify(token, secret) as JwtPayload;

		return {
			success: true,
			data: decodedPayload,
			error: null,
		};
	} catch (error: any) {
		return {
			success: false,
			data: null,
			error: error.message || "Invalid or expired token",
		};
	}
};

export const jwtUtils = {
	createToken,
	verifyToken,
};
