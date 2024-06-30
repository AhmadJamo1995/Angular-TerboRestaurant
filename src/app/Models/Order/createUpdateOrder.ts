import { customer } from "../Customer/customer";
import { meal } from "../Meal/meal";

export interface createUpdateOrder {
    id : number;
    dateTime : String;
    notes : string;
    CustomerId : customer;
    meals : meal[];
}
