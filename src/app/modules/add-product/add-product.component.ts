import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../../models/product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  newProduct: Product;

  constructor(public dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public product: Product
  ) {
    this.newProduct = { ...product };
  }

  saveProduct(): void {
    this.dialogRef.close(this.newProduct);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
