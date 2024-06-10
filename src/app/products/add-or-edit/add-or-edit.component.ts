import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from 'src/app/services/products/products.service';
import { ProductModel } from 'src/app/models/product.model';

@Component({
  selector: 'app-add-or-edit',
  templateUrl: './add-or-edit.component.html',
  styleUrls: ['./add-or-edit.component.sass']
})
export class AddOrEditComponent implements OnInit {
  form!: FormGroup;
  newOrOldCollection: string = "Nova";
  newOrOldCategory: string = "Nova";
  categories: string[] = ['Colares', 'Pulseiras', 'Gargatilhas', 'Braceletes', 'Aneis'];
  groups: string[] = ['Verão', 'Outono', 'Inverno', 'Primavera'];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public dialogRef: MatDialogRef<AddOrEditComponent>,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    public productService: ProductsService,
  ) {}

  ngOnInit(): void {
    this.buildingForm();
  }

  buildingForm(): void {
    if(this.dialogRef !== null) {
      this.form.patchValue(this.dialogRef)
    } else {
      this.form = this.formBuilder.group({
        "name": [null],
        "description": [null],
        "valor": [null],
        "type": [null],
        "groups": [null],
        "image": [null]
      });
    }
  }

  addProduct(): void {
    let product: ProductModel = Object.assign(new ProductModel(), this.form.value);


    const file: File = (this.form.value.image).files[0];
    const formData = new FormData();



    formData.append('image', file)

    console.log(product);
    console.log(formData);




    // this.productService.createProduct(product)
    //   .then(() => {
    //     this.dialog.closeAll();
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })
    //   .finally(() => {
    //     console.log('finalizou');
    //   })
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
    this.dialog.closeAll();
  }
}
