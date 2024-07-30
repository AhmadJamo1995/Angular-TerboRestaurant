import { Gender } from "../../Enum/Gender.enum";

export interface createUpdateCustomer {
    id: number;
    phoneNumber: string;
    email: string;
    gender: Gender;
    firstName: String;
    lastName: String;
    dateOfBirth: String;
    country: string;

}
