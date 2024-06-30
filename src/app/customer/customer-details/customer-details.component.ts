import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { customerDetails } from '../../Models/Customer/customerDetails';
import { CustomerService } from '../../Services/customer.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.css'
})
export class CustomerDetailsComponent implements OnInit {

  customerId!: number;
  customer?: customerDetails;

  constructor(
    private customerSvc: CustomerService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute
  ) { }


  ngOnInit(): void {

    this.setId();
    this.loadcustomer();
  }

  private setId(): void {

    if (this.activatedRoute.snapshot.paramMap.get("id")) {

      this.customerId = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    }
  }


  private loadcustomer(): void {

    this.spinner.show();

    this.customerSvc.getCustomer(this.customerId).subscribe({
      next: (customerFromApi: customerDetails) => {

        this.customer = customerFromApi;
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
