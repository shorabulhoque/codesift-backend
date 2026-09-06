export interface IRegisterCandidatePayload {
    email: string;
    password: string;
    fullName: string;
};

export interface IRegisterRecruiterPayload {
    email: string;
    password: string;
    fullName: string;
    companyName: string;
    businessRegistrationNo: string;
};