import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ingredient } from '../../Models/Ingredient/ingredient';

@Component({
  selector: 'app-delete-ingredient-dialog-component',
  templateUrl: './delete-ingredient-dialog-component.component.html',
  styleUrl: './delete-ingredient-dialog-component.component.css'
})
export class DeleteIngredientDialogComponentComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteIngredientDialogComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public ingredient: ingredient,
  ) { }
}
