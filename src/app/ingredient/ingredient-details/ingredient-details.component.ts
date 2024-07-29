import { Component, OnInit } from '@angular/core';
import { IngredientService } from '../../Services/ingredient.service';
import { ingredient } from '../../Models/Ingredient/ingredient';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ingredient-details',
  templateUrl: './ingredient-details.component.html',
  styleUrl: './ingredient-details.component.css'
})
export class IngredientDetailsComponent implements OnInit {

  ingredientId!: number;
  ingredient?: ingredient;

  constructor(
    private IngredientSvc: IngredientService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute
  ) { }


  ngOnInit(): void {

    this.setId();
    this.loadIngredient();
  }

  private setId(): void {

    if (this.activatedRoute.snapshot.paramMap.get("id")) {

      this.ingredientId = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    }
  }


  private loadIngredient(): void {

    this.spinner.show();

    this.IngredientSvc.getIngredient(this.ingredientId).subscribe({
      next: (IngredientFromApi: ingredient) => {

        this.ingredient = IngredientFromApi;
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

//#endregion
