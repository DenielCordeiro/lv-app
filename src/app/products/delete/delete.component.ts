import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.sass']
})
export class DeleteComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public dialogRef: MatDialogRef<DeleteComponent>,
    // public dialog: MatDialog,
  ) {

  }

  // deletingProduct() {
  //   if (id !== undefined) {
  //     const data = this.productsService.deleteProduct(id);
  //   } else {
  //     alert("[Erro]: você não selecionou o produto");
  //   }
  // }

}
