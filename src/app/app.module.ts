import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HomeComponent } from './home/home.component';
import { CustomerComponent } from './customer/customer.component';
import { CreateUpdateCustomerComponent } from './customer/create-update-customer/create-update-customer.component';
import { CustomerDetailsComponent } from './customer/customer-details/customer-details.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { DeleteCustomerDialogComponentComponent } from './customer/delete-customer-dialog-component/delete-customer-dialog-component.component';
import { MatDialogModule } from '@angular/material/dialog';
import { IngredientComponent } from './ingredient/ingredient.component';
import { DeleteIngredientDialogComponentComponent } from './ingredient/delete-ingredient-dialog-component/delete-ingredient-dialog-component.component';
import { provideHttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { CreateUpdateIngredientComponent } from './ingredient/create-update-ingredient/create-update-ingredient.component';
import { IngredientDetailsComponent } from './ingredient/ingredient-details/ingredient-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MealComponent } from './meal/meal.component';
import { CreateUpdateMealComponent } from './meal/create-update-meal/create-update-meal.component';
import { MealDetailsComponent } from './meal/meal-details/meal-details.component';
import { DeleteMealDialogComponent } from './meal/delete-meal-dialog/delete-meal-dialog.component';
import { ToastrModule } from 'ngx-toastr';
import { OrderComponent } from './order/order.component';
import { OrderDetailsComponent } from './order/order-details/order-details.component';
import { CreateUpdateOrderComponent } from './order/create-update-order/create-update-order.component';
import { DeleteOrderDialogComponent } from './order/delete-order-dialog/delete-order-dialog.component';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CustomerComponent,
    CreateUpdateCustomerComponent,
    CustomerDetailsComponent,
    DeleteCustomerDialogComponentComponent,
    IngredientComponent,
    DeleteIngredientDialogComponentComponent,
    CreateUpdateIngredientComponent,
    IngredientDetailsComponent,
    MealComponent,
    CreateUpdateMealComponent,
    MealDetailsComponent,
    DeleteMealDialogComponent,
    OrderComponent,
    OrderDetailsComponent,
    CreateUpdateOrderComponent,
    DeleteOrderDialogComponent,
    ScrollToTopComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgxSpinnerModule,
    MatDialogModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
