import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageMode } from '../../Enum/page-mode.enum';
import { MealService } from '../../Services/meal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { meal } from '../../Models/Meal/meal';
import { IngredientService } from '../../Services/ingredient.service';
import { LookUp } from '../../Models/LookUp';
import { ToastrService } from 'ngx-toastr';
import { createUpdateMeal } from '../../Models/Meal/createUpdateMeal';

@Component({
  selector: 'app-create-update-meal',
  templateUrl: './create-update-meal.component.html',
  styleUrl: './create-update-meal.component.css'
})
export class CreateUpdateMealComponent implements OnInit {

  ingredientLookup: LookUp[] = [];
  MealId!: number;
  form!: FormGroup;

  Meal?: createUpdateMeal;
  pageMode: PageMode = PageMode.Create;

  pageModeEnum = PageMode;

  constructor(
    private ingredientSvc: IngredientService,
    private MealSvc: MealService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.loadIngredientLookup()
    this.setId();
    this.buildForm();

    if (this.pageMode === PageMode.Edit) {

      this.loadMeal();
    }
  }

  submit(): void {

    if (this.form.valid) {

      if (this.pageMode === PageMode.Create) {

        this.createMeal();
      }
      else {

        this.updateMeal();
      }
    }
  }

  //#region Private Methods

  private setId(): void {

    if (this.activatedRoute.snapshot.paramMap.get('id')) {

      this.MealId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      this.pageMode = PageMode.Edit;
    }

  }

  private buildForm(): void {

    this.form = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      description: [''],
      ingredientIds: [''],
    });

  }

  private loadMeal(): void {

    this.spinner.show();

    this.MealSvc.getMealForEdit(this.MealId).subscribe({
      next: (MealFromApi: createUpdateMeal) => {

        this.Meal = MealFromApi;
        this.form.patchValue(MealFromApi);
      },
      error: (err: HttpErrorResponse) => {

        this.toastr.error(err.message);
      },
      complete: () => {

        this.spinner.hide();
      }
    });

  }

  private loadIngredientLookup(): void {

    this.spinner.show();

    this.ingredientSvc.getIngredientLookup().subscribe({
      next: (IngredientLookupFromApi: LookUp[]) => {

        this.ingredientLookup = IngredientLookupFromApi;
      },
      error: (err: HttpErrorResponse) => {

        this.toastr.error(err.message)
      },
      complete: () => {

        this.spinner.hide();
      }
    });
  }

  private createMeal(): void {

    this.spinner.show();

    this.MealSvc.createMeal(this.form.value).subscribe({
      next: () => {

        this.toastr.success(`Meal has been created successfully.`);
        this.router.navigate(['/meal']);
      },
      error: (err: HttpErrorResponse) => {

        this.toastr.error(err.message);
      },
      complete: () => {

        this.spinner.hide();
      }
    });
  }

  private updateMeal(): void {

    this.spinner.show();

    this.MealSvc.updateMeal(this.MealId, this.form.value).subscribe({
      next: () => {

        this.toastr.success(`Meal has been updated successfully.`);
        this.router.navigate(['/meal']);
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
