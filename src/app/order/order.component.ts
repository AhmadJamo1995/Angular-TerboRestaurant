import { Component, OnInit } from '@angular/core';
import { DeleteOrderDialogComponent } from './delete-order-dialog/delete-order-dialog.component';
import { Order } from '../Models/Order/order';
import { OrderService } from '../Services/order.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {

  orders: Order[] = []

  constructor(
    private orderSvc: OrderService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.loadOrders();
  }
  deleteOrder(order: Order): void {

    let deleteDialog = this.dialog.open(DeleteOrderDialogComponent, {
      data: order
    });

    deleteDialog.afterClosed().subscribe({
      next: (answer: boolean) => {

        if (answer) {

          this.spinner.show();

          this.orderSvc.deleteOrder(order.id).subscribe({
            next: () => {

              this.toastr.success(`Product has been deleted successfully.`);
              this.loadOrders();
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

  loadOrders() {

    this.spinner.show();

    this.orderSvc.getItems().subscribe({
      next: (ordersFromApi: Order[]) => {

        this.orders = ordersFromApi;
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
