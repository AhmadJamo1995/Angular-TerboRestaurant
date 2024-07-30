import { Gender } from "../../Enum/Gender.enum";

export interface customerDetails {
    id: number;
    phoneNumber: string;
    email: string;
    gender: Gender
    fullName: String;
    age: number
    country: string;

}
