import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Order } from '../../Models/Order/order';

@Component({
  selector: 'app-delete-order-dialog',
  templateUrl: './delete-order-dialog.component.html',
  styleUrl: './delete-order-dialog.component.css'
})
export class DeleteOrderDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public order: Order,
  ) { }
}
