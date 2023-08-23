export function createImageOnCanvas(img: HTMLImageElement, width: number, height: number): string {
  const canvas = document.createElement("canvas");
  canvas.height = height;
  canvas.width = width;
  
  const context = canvas.getContext("2d")!;
  context.scale(canvas.width / img.width, canvas.height / img.height);
  context.drawImage(img, 0, 0);

  return canvas.toDataURL('img/jpeg');
}
