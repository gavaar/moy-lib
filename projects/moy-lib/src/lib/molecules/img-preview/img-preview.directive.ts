import { ChangeDetectionStrategy, Component, Directive, ElementRef, HostListener, Inject, OnInit } from '@angular/core';
import { DIALOG_DATA, Dialog, DialogModule } from '@angular/cdk/dialog';
import { MoyImageResizer, lazyLoadSrc } from '../../atoms';
import { from } from 'rxjs';

const LOADING_GIF = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';

@Component({
  standalone: true,
  template: `
    <div>
      <img [src]="data.originalSrc" />  
    </div>
  `,
  imports: [DialogModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoyImgPreviewComponent {
  constructor(@Inject(DIALOG_DATA) public data: { originalSrc: string }) {}
}

@Directive({
  standalone: true,
  selector: 'img[moy-preview]',
})
export class MoyImgPreviewDirective implements OnInit {
  private _originalSrc = '';

  constructor(private element: ElementRef<HTMLImageElement>, private dialog: Dialog) {}

  ngOnInit(): void {
    const imageSource = this.element.nativeElement.src;
    this._originalSrc = imageSource;
    this.element.nativeElement.src = LOADING_GIF;

    const previewSize = new MoyImageResizer().width(64).resize(imageSource);

    from(previewSize).subscribe({
      next: (preview: string) => {
        this.element.nativeElement.src = preview;
        lazyLoadSrc(this.element.nativeElement);
      },
    });
  }

  @HostListener('click')
  onClick() {
    this.dialog.open(MoyImgPreviewComponent, {
      maxWidth: '64vw',
      maxHeight: '48vh',
      data: {
        originalSrc: this._originalSrc,
      },
    });
  }
}
