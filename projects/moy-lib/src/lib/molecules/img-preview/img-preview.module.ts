import { DialogModule } from '@angular/cdk/dialog';
import { NgModule } from '@angular/core';
import { MoyImgPreviewComponent, MoyImgPreviewDirective } from './img-preview.directive';

@NgModule({
  imports: [
    DialogModule,
    MoyImgPreviewComponent,
    MoyImgPreviewDirective,
  ],
  exports: [
    DialogModule,
    MoyImgPreviewDirective,
    MoyImgPreviewComponent,
  ]
})
export class MoyImgPreviewModule {}
