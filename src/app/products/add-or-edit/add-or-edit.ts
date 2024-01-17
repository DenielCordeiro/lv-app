import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-add-or-edit',
  templateUrl: './add-or-edit.component.html',
  styleUrls: ['./add-or-edit.component.sass']
})
export class AddOrEditComponent {
  form!: FormGroup;
  newOrOldCollection: string = "Nova";
  newOrOldCategory: string = "Nova";

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public dialogRef: MatDialogRef<AddOrEditComponent>,
    private formBuilder: FormBuilder,
    public productService: ProductsService
  ) {
    console.log("dados do dialog: ", dialogRef);
  }

  buildingForm(): void {
    console.log('construindo formulário')
  }

  addProduct(): void {
    // let product: ProductModel =  Object.assign(new ProductModel(), this.form.value);

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

    console.log("function add product");
  }

  changeCollectionSelect(): string {
    if (this.newOrOldCollection == "Nova") {
      return this.newOrOldCollection = "Existente";
    } else {
      return this.newOrOldCollection = "Nova"
    }
  }

  changeCategorySelect(): string {
    if (this.newOrOldCategory == "Nova") {
      return this.newOrOldCategory = "Existente";
    } else {
      return this.newOrOldCategory = "Nova"
    }
  }

  closeModal(): void {
    this.dialogRef.close(true);
  }
}
