import { meal } from "../Meal/meal";

export interface OrderDetails {
    id: number;
    orderTime: string;
    totalPrice: number;
    notes: string;
    customerFullName: string;
    meals: meal[];
}
