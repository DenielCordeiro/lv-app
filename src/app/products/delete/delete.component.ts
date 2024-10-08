import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ProductsService } from 'src/app/services/products/products.service';
import { Product } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.sass']
})
export class DeleteComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public loadedProduct: Product[],
    public dialog: MatDialog,
    private productsService: ProductsService
  ) {}

  deletingProduct(productId: number | undefined): void {
    // this.loadedProduct.forEach(product => {
    //   console.log(product._id);
    // });

    console.log("id do produto: ", productId);

    if (productId !== undefined) {
      this.productsService.deleteProduct(productId)
        .then(result => {
          console.log(result);
        })
    } else {
      alert('[Erro!], não foi possível encontrar id do produto selecionado');
    }


  }
}
