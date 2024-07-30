import { Gender } from "../../Enum/Gender.enum";

export interface customer {
   id: number;
   phoneNumber: string;
   email: string;
   gender: Gender
   fullName: String;
   age: number
   country: string;
}
