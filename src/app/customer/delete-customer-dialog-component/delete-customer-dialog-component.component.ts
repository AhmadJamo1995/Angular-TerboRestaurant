import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { customer } from '../../Models/Customer/customer';



@Component({
  selector: 'app-delete-customer-dialog-component',
  templateUrl: './delete-customer-dialog-component.component.html',
  styleUrl: './delete-customer-dialog-component.component.css'
})
export class DeleteCustomerDialogComponentComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteCustomerDialogComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public customer: customer,
  ) { }
}
