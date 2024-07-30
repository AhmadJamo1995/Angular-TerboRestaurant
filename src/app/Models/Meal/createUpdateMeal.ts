import { Gender } from "../../Enum/Gender.enum";
import { ingredient } from "../Ingredient/ingredient";

export interface createUpdateMeal {
    id: number;
    name: String;
    description: string;
    IngredientIds: ingredient[];

}
