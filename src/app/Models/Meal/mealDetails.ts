import { Gender } from "../../Shared/Gender.enum";
import { ingredient } from "../Ingredient/ingredient";

export interface mealDetails {
    id: number;
    name: String;
    description: string;
    price: number;
    ingredients: ingredient[];

}
