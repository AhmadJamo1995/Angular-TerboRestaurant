import { Component, OnInit } from '@angular/core';
import { meal } from '../Models/Meal/meal';
import { MealService } from '../Services/meal.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DeleteMealDialogComponent } from './delete-meal-dialog/delete-meal-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrl: './meal.component.css'
})
export class MealComponent implements OnInit {

  meals: meal[] = []

  constructor(
    private mealSvc: MealService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.loadIngredients();
  }
  deleteIngredient(meal: meal): void {

    let deleteDialog = this.dialog.open(DeleteMealDialogComponent, {
      data: meal
    });

    deleteDialog.afterClosed().subscribe({
      next: (answer: boolean) => {

        if (answer) {

          this.spinner.show();

          this.mealSvc.deleteMeal(meal.id).subscribe({
            next: () => {

              this.toastr.success(`Meal has been deleted successfully.`);
              this.loadIngredients();
            },
            error: (err: HttpErrorResponse) => {

              this.toastr.error(err.message);
            },
            complete: () => {

              this.spinner.hide();
            }
          });
        }

      }
    });

  }
  //#region Private Functions

  loadIngredients() {

    this.spinner.show();

    this.mealSvc.getItems().subscribe({
      next: (mealsFromApi: meal[]) => {

        this.meals = mealsFromApi;
      },
      error: (err: HttpErrorResponse) => {

        // this.toastr.error(err.message);
      },
      complete: () => {

        this.spinner.hide();
      }
    });
  }

  //#endregion
}
