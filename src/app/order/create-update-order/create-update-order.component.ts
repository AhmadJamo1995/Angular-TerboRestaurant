import { Component, OnInit } from '@angular/core';
import { PageMode } from '../../Enum/page-mode.enum';
import { LookUp } from '../../Models/LookUp';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from '../../Models/Order/order';
import { OrderService } from '../../Services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { createUpdateOrder } from '../../Models/Order/createUpdateOrder';
import { MealService } from '../../Services/meal.service';
import { CustomerService } from '../../Services/customer.service';

@Component({
  selector: 'app-create-update-order',
  templateUrl: './create-update-order.component.html',
  styleUrl: './create-update-order.component.css'
})
export class CreateUpdateOrderComponent implements OnInit {



  customerLookup: LookUp[] = [];
  mealLookup: LookUp[] = [];
  OrderId!: number;
  form!: FormGroup;

  Order?: createUpdateOrder;
  pageMode: PageMode = PageMode.Create;

  pageModeEnum = PageMode;

  constructor(
    private customerSVC: CustomerService,
    private orderSvc: OrderService,
    private mealSvc: MealService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadcustomerLookup();
    this.loadmealLookup();
    this.setId();
    this.buildForm();

    if (this.pageMode === PageMode.Edit) {

      this.loadOrder();
    }
  }

  submit(): void {

    if (this.form.valid) {

      if (this.pageMode === PageMode.Create) {

        this.createOrder();
      }
      else {

        this.updateOrder();
      }
    }
  }

  //#region Private Methods

  private setId(): void {

    if (this.activatedRoute.snapshot.paramMap.get('id')) {

      this.OrderId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      this.pageMode = PageMode.Edit;
    }

  }

  private buildForm(): void {

    this.form = this.fb.group({
      id: [0],
      notes: [''],
      customerId: [''],
      mealIds: [''],
    });

  }

  private loadOrder(): void {

    this.spinner.show();

    this.orderSvc.getOrderForEdit(this.OrderId).subscribe({
      next: (OrderFromApi: createUpdateOrder) => {

        this.Order = OrderFromApi;
        this.form.patchValue(OrderFromApi);
      },
      error: (err: HttpErrorResponse) => {

        this.toastr.error(err.message);
      },
      complete: () => {

        this.spinner.hide();
      }
    });

  }
  private loadmealLookup(): void {

    this.spinner.show();

    this.mealSvc.getMealLookup().subscribe({
      next: (mealLookupFromApi: LookUp[]) => {

        this.mealLookup = mealLookupFromApi;
      },
      error: (err: HttpErrorResponse) => {

        this.toastr.error(err.message)
      },
      complete: () => {

        this.spinner.hide();
      }
    });
  }
  private loadcustomerLookup(): void {

    this.spinner.show();

    this.customerSVC.getCustomerLookup().subscribe({
      next: (customerLookupFromApi: LookUp[]) => {

        this.customerLookup = customerLookupFromApi;
      },
      error: (err: HttpErrorResponse) => {

        this.toastr.error(err.message)
      },
      complete: () => {

        this.spinner.hide();
      }
    });
  }

  private createOrder(): void {

    this.spinner.show();

    this.orderSvc.createOrder(this.form.value).subscribe({
      next: () => {

        this.toastr.success(`Order has been created successfully.`);
        this.router.navigate(['/order']);
      },
      error: (err: HttpErrorResponse) => {

        this.toastr.error(err.message);
      },
      complete: () => {

        this.spinner.hide();
      }
    });
  }

  private updateOrder(): void {

    this.spinner.show();

    this.orderSvc.updateOrder(this.OrderId, this.form.value).subscribe({
      next: () => {

        this.toastr.success(`Order has been updated successfully.`);
        this.router.navigate(['/order']);
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