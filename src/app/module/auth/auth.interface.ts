export interface IRegisterCandidatePayload {
	email: string;
	password: string;
	fullName: string;
}

export interface IRegisterRecruiterPayload {
	email: string;
	password: string;
	fullName: string;
	companyName: string;
	businessRegistrationNo: string;
}

export interface IVerifyEmailPayload {
	email: string;
	otp: string;
}

export interface ILoginUserPayload {
	email: string;
	password: string;
}

export interface IGoogleLoginPayload {
	idToken: string;
}

export interface IForgotPasswordPayload {
	email: string;
}

export interface IResetPasswordPayload {
	email: string;
	otp: string;
	newPassword: string;
}
