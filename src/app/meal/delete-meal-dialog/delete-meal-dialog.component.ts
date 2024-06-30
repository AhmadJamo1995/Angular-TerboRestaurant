import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { meal } from '../../Models/Meal/meal';

@Component({
  selector: 'app-delete-meal-dialog',
  templateUrl: './delete-meal-dialog.component.html',
  styleUrl: './delete-meal-dialog.component.css'
})
export class DeleteMealDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteMealDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public meal: meal,
  ) { }
}
