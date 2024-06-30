import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ingredient } from '../../Models/Ingredient/ingredient';
import { IngredientService } from '../../Services/ingredient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PageMode } from '../../Enum/page-mode.enum';

@Component({
  selector: 'app-create-update-ingredient',
  templateUrl: './create-update-ingredient.component.html',
  styleUrl: './create-update-ingredient.component.css'
})
export class CreateUpdateIngredientComponent implements OnInit {

  IngredientId!: number;
  form!: FormGroup;

  Ingredient?: ingredient;
  pageMode: PageMode = PageMode.Create;

  pageModeEnum = PageMode;

  constructor(
    private IngredientSvc: IngredientService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    //private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.setId();
    this.buildForm();

    if (this.pageMode === PageMode.Edit) {

      this.loadIngredient();
    }
  }

  submit(): void {

    if (this.form.valid) {

      if (this.pageMode === PageMode.Create) {

        this.createIngredient();
      }
      else {

        this.updateIngredient();
      }
    }
  }

  //#region Private Methods

  private setId(): void {

    if (this.activatedRoute.snapshot.paramMap.get('id')) {

      this.IngredientId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      this.pageMode = PageMode.Edit;
    }

  }

  private buildForm(): void {

    this.form = this.fb.group({
      id: [0],
      Name: ['', Validators.required],
      Price : ['', Validators.required],
      
      
    });

  }

  private loadIngredient(): void {

    this.spinner.show();

    this.IngredientSvc.getIngredientForEdit(this.IngredientId).subscribe({
      next: (IngredientFromApi: ingredient) => {

        this.Ingredient = IngredientFromApi;
        this.form.patchValue(IngredientFromApi);
      },
      error: (err: HttpErrorResponse) => {

       // this.toastr.error(err.message);
      },
      complete: () => {

        this.spinner.hide();
      }
    });

  }

  private createIngredient(): void {

    this.spinner.show();

    this.IngredientSvc.createIngredient(this.form.value).subscribe({
      next: () => {

       // this.toastr.success(`Ingredient has been created successfully.`);
        this.router.navigate(['/ingredient']);
      },
      error: (err: HttpErrorResponse) => {

      //  this.toastr.error(err.message);
      },
      complete: () => {

        this.spinner.hide();
      }
    });
  }

  private updateIngredient(): void {

    this.spinner.show();

    this.IngredientSvc.updateIngredient(this.IngredientId, this.form.value).subscribe({
      next: () => {

        //this.toastr.success(`Ingredient has been updated successfully.`);
        this.router.navigate(['/ingredient']);
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

}  {

}

