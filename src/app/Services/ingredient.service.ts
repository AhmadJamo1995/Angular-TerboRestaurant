import { Injectable } from '@angular/core';
import { ingredient } from '../Models/Ingredient/ingredient';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LookUp } from '../Models/LookUp';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private apiUrl = 'https://localhost:7223/api'; 

   
  constructor( private http : HttpClient) { 
    
  }
  getItems(): Observable<ingredient[]> {
    return this.http.get<ingredient[]>(`${this.apiUrl}/Ingredients/GetIngredients`);
  }

  getIngredient(id: number): Observable<ingredient> {

    return this.http.get<ingredient>(`${this.apiUrl}/Ingredients/GetIngredient/${id}`);

}

getIngredientForEdit(id: number): Observable<ingredient> {

  return this.http.get<ingredient>(`${this.apiUrl}/Ingredients/GetIngredientForEdit/${id}`);


}


createIngredient(ingredient: ingredient): Observable<any> {

  return this.http.post<ingredient>(`${this.apiUrl}/Ingredients/PostIngredient`, ingredient)
}

updateIngredient(id: number, ingredient: ingredient): Observable<any> {

  return this.http.put<ingredient>(`${this.apiUrl}/Ingredients/PutIngredient/${id}`, ingredient);
}


deleteIngredient(id: number): Observable<any> {

  return this.http.delete(`${this.apiUrl}/Ingredients/DeleteIngredient/${id}`);
}
getIngredientLookup(): Observable<LookUp[]> {

  return this.http.get<LookUp[]>(`${this.apiUrl}/Ingredients/GetIngredientLookup`);
}


}