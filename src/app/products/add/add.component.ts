import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductModel } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.sass']
})
export class AddComponent {
  form!: FormGroup;
  newOrOldCollection: string = "Nova";
  newOrOldCategory: string = "Nova";

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public dialogRef: MatDialogRef<AddComponent>,
    private formBuilder: FormBuilder,
    public productService: ProductsService
  ) {}

  changeCollectionSelect(): void {
    if (this.newOrOldCollection == "Nova") {
      this.newOrOldCollection = "Existente";
    } else {
      this.newOrOldCollection = "Nova"
    }
  }

  changeCategorySelect(): void {
    if (this.newOrOldCategory == "Nova") {
      this.newOrOldCategory = "Existente";
    } else {
      this.newOrOldCategory = "Nova"
    }
  }

  creatingProduct(): void {
    let product: ProductModel =  Object.assign(new ProductModel(), this.form.value);

    // this.productService.createProduct(product)
    //   .then(() => {
    //     this.dialogRef.close(true);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })
    //   .finally(() => {
    //     console.log('finalizou');
    //   })
  }
}
