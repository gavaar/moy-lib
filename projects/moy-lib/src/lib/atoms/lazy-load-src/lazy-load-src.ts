import { MoyImageIntersectionObserver } from './models';

/**
 * Pass an img element to this function to add it to the lazily-loaded elements.
 * The src will get loaded once the image enters the viewport.
 * 
 * @param element the HTML element which will have this behavior
 */
export const lazyLoadSrc = (element: HTMLImageElement) => {
  const originalSrc = element.src;
  element.src = '';
  element.setAttribute('data-src', originalSrc);
  MoyImageIntersectionObserver.observe(element);
}
