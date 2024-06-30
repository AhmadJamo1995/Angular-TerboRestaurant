import { Gender } from "../../Shared/Gender.enum";
import { meal } from "../Meal/meal";

export interface orderDetails {
    id : number;
    dateTime : String;
    totalPrice : number;
    notes : string;
    CustomerId : string;
    meals : meal[];
}
