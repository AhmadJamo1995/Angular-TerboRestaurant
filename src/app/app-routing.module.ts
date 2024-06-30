import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CustomerComponent } from './customer/customer.component';
import { CreateUpdateCustomerComponent } from './customer/create-update-customer/create-update-customer.component';
import { CustomerDetailsComponent } from './customer/customer-details/customer-details.component';
import { IngredientComponent } from './ingredient/ingredient.component';
import { CreateUpdateIngredientComponent } from './ingredient/create-update-ingredient/create-update-ingredient.component';
import { IngredientDetailsComponent } from './ingredient/ingredient-details/ingredient-details.component';
import { MealComponent } from './meal/meal.component';
import { CreateUpdateMealComponent } from './meal/create-update-meal/create-update-meal.component';
import { MealDetailsComponent } from './meal/meal-details/meal-details.component';
import { OrderComponent } from './order/order.component';
import { CreateUpdateOrderComponent } from './order/create-update-order/create-update-order.component';
import { OrderDetailsComponent } from './order/order-details/order-details.component';

const routes: Routes = [


  {


    path: 'home',
    component: HomeComponent
  },

  {
    path: 'customer',
    component: CustomerComponent

  },
  {
    path: 'add/customer',
    component: CreateUpdateCustomerComponent

  },
  {
    path: 'edit/customer/:id',
    component: CreateUpdateCustomerComponent

  },
  {
    path: 'details/customer/:id',
    component: CustomerDetailsComponent

  },
  {
    path: 'ingredient',
    component: IngredientComponent

  },
  {
    path: 'add/ingredient',
    component: CreateUpdateIngredientComponent

  },
  {
    path: 'edit/ingredient/:id',
    component: CreateUpdateIngredientComponent

  },
  {
    path: 'details/ingredient/:id',
    component: IngredientDetailsComponent

  },
  {
    path: 'meal',
    component: MealComponent

  },
  {
    path: 'add/meal',
    component: CreateUpdateMealComponent

  },
  {
    path: 'edit/meal/:id',
    component: CreateUpdateMealComponent

  },
  {
    path: 'details/meal/:id',
    component: MealDetailsComponent

  },
  {
    path: 'order',
    component: OrderComponent

  },
  {
    path: 'add/order',
    component: CreateUpdateOrderComponent

  },
  {
    path: 'edit/order/:id',
    component: CreateUpdateOrderComponent

  },
  {
    path: 'details/order/:id',
    component: OrderDetailsComponent

  },


  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
