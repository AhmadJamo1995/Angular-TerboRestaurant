import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { meal } from '../Models/Meal/meal';
import { Observable } from 'rxjs';
import { mealDetails } from '../Models/Meal/mealDetails';
import { createUpdateMeal } from '../Models/Meal/createUpdateMeal';
import { LookUp } from '../Models/LookUp';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  private apiUrl = 'https://localhost:7223/api'; 

   
  constructor( private http : HttpClient) { 
    
  }
  getItems(): Observable<meal[]> {
    return this.http.get<meal[]>(`${this.apiUrl}/Meals/GetMeals`);
  }

  getMeal(id: number): Observable<mealDetails> {

    return this.http.get<mealDetails>(`${this.apiUrl}/Meals/GetMeal/${id}`);

}

getMealForEdit(id: number): Observable<createUpdateMeal> {

  return this.http.get<createUpdateMeal>(`${this.apiUrl}/Meals/GetMealForEdit/${id}`);


}


createMeal(meal: createUpdateMeal): Observable<any> {

  return this.http.post<createUpdateMeal>(`${this.apiUrl}/Meals/PostMeal`, meal)
}

updateMeal(id: number, meal: createUpdateMeal): Observable<any> {

  return this.http.put<createUpdateMeal>(`${this.apiUrl}/Meals/PutMeal/${id}`, meal);
}


deleteMeal(id: number): Observable<any> {

  return this.http.delete(`${this.apiUrl}/Meals/DeleteMeal/${id}`);
}
getMealLookup(): Observable<LookUp[]> {

  return this.http.get<LookUp[]>(`${this.apiUrl}/Meals/GetMealLookup`);
}

}
