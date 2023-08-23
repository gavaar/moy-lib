import { ImageResizeCache } from '../models';
import { createImageOnCanvas } from './create-image-on-canvas';

interface MoyLoadImageOptions {
  src: string;
  width: number;
  height: number;
  cache: ImageResizeCache,
}

export function loadImage(
  resolve: (value: string | PromiseLike<string>) => void,
  reject: (reason?: any) => void,
  loadImageOptions: MoyLoadImageOptions
): void {
  const { src, width, height, cache } = loadImageOptions;

  const img = document.createElement('img');
  img.crossOrigin = '*';
  img.onerror = reject || (() => {});

  img.onload = () => {
    const { width: originalWidth, height: originalHeight } = img;
    cache.set(src, originalWidth, originalHeight, src);

    const widthHeightRatio = originalWidth / originalHeight;

    let newWidth = 0;
    let newHeigth = 0;

    if (widthHeightRatio >= 1) {
      newWidth = width;
      newHeigth = newWidth / widthHeightRatio;
    } else {
      newHeigth = height;
      newWidth = widthHeightRatio * newHeigth;
    }

    const resizedImg = createImageOnCanvas(img, newWidth, newHeigth);
    cache.set(src, newWidth, newHeigth, resizedImg);

    img.remove();
    resolve(resizedImg);
  }

  img.src = src;
}
