import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ingredient } from '../Models/Ingredient/ingredient';
import { IngredientService } from '../Services/ingredient.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DeleteIngredientDialogComponentComponent } from './delete-ingredient-dialog-component/delete-ingredient-dialog-component.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrl: './ingredient.component.css'
})
export class IngredientComponent implements OnInit {

  ingredients: ingredient[] = []

  constructor(
    private ingredientrSvc: IngredientService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.loadIngredients();
  }
  deleteIngredient(ingredient: ingredient): void {

    let deleteDialog = this.dialog.open(DeleteIngredientDialogComponentComponent, {
      data: ingredient
    });

    deleteDialog.afterClosed().subscribe({
      next: (answer: boolean) => {

        if (answer) {

          this.spinner.show();

          this.ingredientrSvc.deleteIngredient(ingredient.id).subscribe({
            next: () => {

              this.toastr.success(`Ingredient has been deleted successfully.`);
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

    this.ingredientrSvc.getItems().subscribe({
      next: (ingredientsFromApi: ingredient[]) => {

        this.ingredients = ingredientsFromApi;
      },
      error: (err: HttpErrorResponse) => {

        this.toastr.error(err.message);
      },
      complete: () => {

        this.spinner.hide();
      }
    });
  }

  //#endregion
}
