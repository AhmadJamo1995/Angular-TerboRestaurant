import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { customer } from '../../Models/Customer/customer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageMode } from '../../Enum/page-mode.enum';
import { CustomerService } from '../../Services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { createUpdateCustomer } from '../../Models/Customer/createUpdateCustomer';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-update-customer',
  templateUrl: './create-update-customer.component.html',
  styleUrl: './create-update-customer.component.css'
})
export class CreateUpdateCustomerComponent implements OnInit {

  CustomerId!: number;
  form!: FormGroup;

  Customer?: createUpdateCustomer;
  pageMode: PageMode = PageMode.Create;

  pageModeEnum = PageMode;

  constructor(
    private CustomerSvc: CustomerService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.setId();
    this.buildForm();

    if (this.pageMode === PageMode.Edit) {

      this.loadCustomer();
    }
  }

  submit(): void {

    if (this.form.valid) {

      if (this.pageMode === PageMode.Create) {

        this.createCustomer();
      }
      else {

        this.updateCustomer();
      }
    }
  }

  //#region Private Methods

  private setId(): void {

    if (this.activatedRoute.snapshot.paramMap.get('id')) {

      this.CustomerId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      this.pageMode = PageMode.Edit;
    }

  }

  private buildForm(): void {

    this.form = this.fb.group({
      id: [0],
      phoneNumber: [''],
      email: [''],
      gender: [''],
      firstName: [''],
      lastName: [''],
      dateOfBirth: [''],
      country: ['']

    });

  }

  private loadCustomer(): void {

    this.spinner.show();

    this.CustomerSvc.getCustomerForEdit(this.CustomerId).subscribe({
      next: (CustomerFromApi: createUpdateCustomer) => {

        this.Customer = CustomerFromApi;
        this.form.patchValue(CustomerFromApi);
      },
      error: (err: HttpErrorResponse) => {

        this.toastr.error(err.message);
      },
      complete: () => {

        this.spinner.hide();
      }
    });

  }

  private createCustomer(): void {

    this.spinner.show();

    this.CustomerSvc.createCustomer(this.form.value).subscribe({
      next: () => {

        this.toastr.success(`Customer has been created successfully.`);
        this.router.navigate(['/customer']);
      },
      error: (err: HttpErrorResponse) => {

        this.toastr.error(err.message);
      },
      complete: () => {

        this.spinner.hide();
      }
    });
  }

  private updateCustomer(): void {

    this.spinner.show();

    this.CustomerSvc.updateCustomer(this.CustomerId, this.form.value).subscribe({
      next: () => {

        this.toastr.success(`Customer has been updated successfully.`);
        this.router.navigate(['/customer']);
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



