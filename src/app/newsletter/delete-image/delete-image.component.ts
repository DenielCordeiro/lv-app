import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { News } from 'src/app/interfaces/news.interface';
import { NewsletterService } from 'src/app/services/newsletter/newsletter.service';

@Component({
  selector: 'app-delete-image',
  templateUrl: './delete-image.component.html',
  styleUrls: ['./delete-image.component.sass'],
  standalone: false,
})
export class DeleteImageComponent {
  imageUrl: string | undefined = undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public image: News,
    public dialogDeleteImage: MatDialogRef<DeleteImageComponent>,
    public dialog: MatDialog,
    private newsletterService: NewsletterService,
  ) {
    if (this.image.file?.url == undefined) {
      console.log('[ERRO!], não foi possivel Url da imagem não !');
    } else {
      this.imageUrl = this.image.file.url;
    }
  }

  delettingImage(): void {
    if (this.image._id == undefined) {
      console.log('[ERRO!], não foi possivel buscar o id da imagem!');
    } else {
      this.newsletterService.deleteImage(this.image._id)
      .then(data => {
        this.dialogDeleteImage.close(data);
      })
      .catch(error => {
        console.log('[Erro]: não foi possível deletar a imagem, erro: ', error);
      })
      .finally(() => {
        this.dialogDeleteImage.beforeClosed().subscribe(() => {
          console.log('Imagem excluida com sucesso! ');
        });
      });
    }
  }

  closeModal(): void {
    this.dialog.closeAll();
  }
}
