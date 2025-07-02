import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ProductsService } from 'src/app/services/products/products.service';
import { Product } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.sass'],
  standalone: false,
})
export class DeleteProductComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public loadedProduct: Product[],
    public dialog: MatDialog,
    private productsService: ProductsService
  ) {}

  deletingProduct(productId: number | undefined): void {
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
