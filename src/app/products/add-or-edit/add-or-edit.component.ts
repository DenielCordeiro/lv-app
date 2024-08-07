import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from 'src/app/services/products/products.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-add-or-edit',
  templateUrl: './add-or-edit.component.html',
  styleUrls: ['./add-or-edit.component.sass']
})
export class AddOrEditComponent implements OnInit {
  form!: FormGroup;
  files!: Set<File>;
  categories: string[] = ['Colares', 'Pulseiras', 'Gargatilhas', 'Braceletes', 'Aneis'];
  groups: string[] = ['Verão', 'Outono', 'Inverno', 'Primavera'];
  newOrExistCategory: string = 'Nova';
  newOrExistGroups: string = 'Nova';

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public dialogRef: MatDialogRef<AddOrEditComponent>,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    public productService: ProductsService,
    public userService: UserService,
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
        "file": [null]
      });
    }
  }

  onChangeFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const selectFiles = <FileList>event.srcElement.files
      const fileNames = [];
      this.files = new Set();

      for (let i = 0; i < selectFiles.length; i++) {
        fileNames.push(selectFiles[i].name);
        this.files.add(selectFiles[i]);
      }

      this.files.forEach(file => {
        this.form.patchValue({
          file: file
        });
      });

      this.form.get('file')?.updateValueAndValidity();
    }
  }

  addProduct(): void {
    const formData = new FormData();

    formData.append('type', this.form.value.type)
    formData.append('valor', this.form.value.valor)
    formData.append('name', this.form.value.name)
    formData.append('description', this.form.value.description)
    formData.append('groups', this.form.value.groups)
    formData.append('file', this.form.value.file)

    this.productService.createProduct(formData)
      .then(data => {
        console.log('Resultado: ', data);
        this.dialog.closeAll();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log('finalizou');
      })
  }

  changeOptionCategories(): boolean {
    if (this.newOrExistCategory == "Nova") {
      this.newOrExistCategory = "Existente";
    } else {
      this.newOrExistCategory = "Nova"
    }

    return true;
  }

  changeOptionGroups(): boolean {
    if (this.newOrExistGroups == "Nova") {
      this.newOrExistGroups = "Existente";
    } else {
      this.newOrExistGroups = "Nova"
    }

    return true;
  }

  closeModal(): void {
    this.dialog.closeAll();
  }
}
