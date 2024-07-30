import { Component, OnInit } from '@angular/core';
import { Order } from '../../Models/Order/order';
import { OrderService } from '../../Services/order.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { OrderDetails } from '../../Models/Order/orderDetails';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent implements OnInit {

  orderId!: number;
  order?: OrderDetails;

  constructor(
    private orderSvc: OrderService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute
  ) { }


  ngOnInit(): void {

    this.setId();
    this.loadorder();
  }

  private setId(): void {

    if (this.activatedRoute.snapshot.paramMap.get("id")) {

      this.orderId = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    }
  }


  private loadorder(): void {

    this.spinner.show();

    this.orderSvc.getOrder(this.orderId).subscribe({
      next: (orderFromApi: OrderDetails) => {

        this.order = orderFromApi;
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

