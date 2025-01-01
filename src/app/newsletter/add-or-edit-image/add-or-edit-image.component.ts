import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { News } from 'src/app/interfaces/news.interface';
import { NewsletterService } from 'src/app/services/newsletter/newsletter.service';

@Component({
  selector: 'app-add-or-edit-image',
  templateUrl: './add-or-edit-image.component.html',
  styleUrls: ['./add-or-edit-image.component.sass']
})
export class AddOrEditImageComponent {
  form!: FormGroup;
  files!: Set<File>;
  image!: News;

  constructor(
    @Inject(MAT_DIALOG_DATA) public updateData: News,
    private formBuilder: FormBuilder,
    private newsletterService: NewsletterService,
    public dialog: MatDialog,
    public dialogAddOrEdit: MatDialogRef<AddOrEditImageComponent>,
  ) {}

  ngOnInit(): void {
    console.log(this.updateData);

    this.buildingForm();
  }

  buildingForm(): void {
    if(this.updateData._id !== null) {
      this.form = this.formBuilder.group({
        "id": this.updateData._id,
        "type": this.updateData.type,
        "linkProduct": this.updateData.linkProduct,
        "file": this.updateData.file
      });
    } else {
      this.form = this.formBuilder.group({
        "type": this.updateData.type,
        "linkProduct": [null],
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
    };
  }

  buildFormData(): FormData {
    const formData = new FormData();

    formData.append('type', this.form.value.type);
    formData.append('linkProduct', this.form.value.name);
    formData.append('file', this.form.value.file);

    return formData;
  }

  addOrEditProduct(): void {
    const formData = this.buildFormData();

    if (this.updateData._id !== null) {
      this.newsletterService.updateImage(formData, this.form.value.id);
        // .then(data => {
        //   this.dialogAddOrEdit.close(data);
        // })
        // .catch((error) => {
        //   console.log(error);
        // })
        // .finally(() => {
        //   this.dialogAddOrEdit.afterClosed().subscribe(result => {
        //     console.log('Finalizou, resultado: ', result);
        //   });
        // });

    } else {
      this.newsletterService.createImage(formData)
        // .then(data => {
        //   this.dialogAddOrEdit.close(data);
        // })
        // .catch((error) => {
        //   console.log(error);
        // })
        // .finally(() => {
        //   this.dialogAddOrEdit.afterClosed().subscribe(result => {
        //     console.log('Finalizou, resultado: ', result);
        //   });
        // });
    }
  }

  closeModal(): void {
    this.dialog.closeAll();
  }
}
