import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../../models/product';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent {
  product: Product;

  constructor(
    public dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: Product }
  ) {
    this.product = { ...data.product }; // Create a copy of the product data to prevent modifying the original data directly
  }

  saveChanges(): void {
    this.dialogRef.close(this.product); // Pass the updated product data back to the parent component
  }

  closeDialog(): void {
    this.dialogRef.close(); // Close the dialog without saving changes
  }
}
