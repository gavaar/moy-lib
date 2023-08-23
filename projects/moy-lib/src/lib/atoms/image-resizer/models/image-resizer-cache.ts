export class ImageResizeCache {
  private _cache = new Map<string, string>();

  get(src: string, width: number, height: number): string | undefined {
    return this._cache.get(this.buildKey(src, width, height));
  }

  set(src: string, width: number, height: number, resizedSrc: string): void {
    this._cache.set(this.buildKey(src, width, height), resizedSrc);
  }

  private buildKey(src: string, width: number, height: number): string {
    return `${src}::${width}x${height}`;
  }
}
