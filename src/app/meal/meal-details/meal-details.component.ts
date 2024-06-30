import { Component, OnInit } from '@angular/core';
import { meal } from '../../Models/Meal/meal';
import { MealService } from '../../Services/meal.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DeleteMealDialogComponent } from '../delete-meal-dialog/delete-meal-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { mealDetails } from '../../Models/Meal/mealDetails';

@Component({
  selector: 'app-meal-details',
  templateUrl: './meal-details.component.html',
  styleUrl: './meal-details.component.css'
})
export class MealDetailsComponent implements OnInit  {
  
  mealId!: number;
  meal?: mealDetails;
  
  constructor(
    private MealSvc: MealService ,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute
  )
  
  { }
  
  
  ngOnInit(): void {

    this.setId();
    this.loadMeal();
  }

  private setId(): void {

    if (this.activatedRoute.snapshot.paramMap.get("id")) {

      this.mealId = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    }
  }


  private loadMeal(): void {

    this.spinner.show();

    this.MealSvc.getMeal(this.mealId).subscribe({
      next: (MealFromApi: mealDetails) => {

        this.meal = MealFromApi;
      },
      error: (err: HttpErrorResponse) => {

        this.toastr.error(err.message);
      },
      complete: () => {

        this.spinner.hide();
      }

    });
  }}

  //#endregion
