import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../Services/customer.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { customer } from '../Models/Customer/customer';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DeleteCustomerDialogComponentComponent } from './delete-customer-dialog-component/delete-customer-dialog-component.component';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {


  customers: customer[] = []

  constructor(
    private customerSvc: CustomerService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.loadCustomers();
  }
  deleteCustomer(customer: customer): void {

    let deleteDialog = this.dialog.open(DeleteCustomerDialogComponentComponent, {
      data: customer
    });

    deleteDialog.afterClosed().subscribe({
      next: (answer: boolean) => {

        if (answer) {

          this.spinner.show();

          this.customerSvc.deleteCustomer(customer.id).subscribe({
            next: () => {

              this.toastr.success(`Product has been deleted successfully.`);
              this.loadCustomers();
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

  loadCustomers() {

    this.spinner.show();

    this.customerSvc.getItems().subscribe({
      next: (customersFromApi: customer[]) => {

        this.customers = customersFromApi;
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
