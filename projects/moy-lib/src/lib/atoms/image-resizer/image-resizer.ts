import { ImageResizeCache } from './models';
import { loadImage } from './util';

/**
 * Class that can be used to resize any img src.
 * It can set `width` and `height` properties to set the max permitted WxH for the image to resize.
 * ```typescript
 * new MoyImageResizer()
 *   .width(480)
 *   .height(360)
 *   .resize('assets/my-funny-image.jpg');
 * ```
 */
export class MoyImageResizer {
  private _width = 1280;
  private _height = 720;
  private _cache = new ImageResizeCache();

  /**
   * Sets max width of image, keeping aspect-ratio. Defaults to 1280.
   * ```typescript
   * new MoyImageResizer()
   *   .width(480)
   *   .resize('assets/my-funny-image.jpg');
   * ```
   */
  width(width: number): MoyImageResizer {
    this._width = width;
    return this;
  }

  /**
   * Sets max height of image, keeping aspect-ratio. Defaults to 720.
   * ```typescript
   * new MoyImageResizer()
   *   .height(360)
   *   .resize('assets/my-funny-image.jpg');
   * ```
   */
  height(height: number): MoyImageResizer {
    this._height = height;
    return this;
  }

  /**
   * Takes the img src, and returns a new src for the resized image.
   *
   * **Note**: it keeps aspect-ratio, so providing both width and height would resize only the biggest
   * of those, updating the other one accordingly.
   * 
   * ```typescript
   * // original image is 1280 x 720
   * const newSrc = await new MoyImageResizer()
   *   .width(480)
   *   .height(200) // no effect, as image ratio would keep it as 480x360.
   *   .resize('assets/mysrc.jpg');
   * ```
   * 
   * the ability to resize both at the same time is in _coming soon_ state.
   */
  resize(src: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const cachedImage = this._cache.get(src, this._width, this._height);
    
      if (cachedImage) {
        resolve(cachedImage);
      }

      loadImage(resolve, reject, { src, width: this._width, height: this._height, cache: this._cache });
    });
  }
}
