export const MoyImageIntersectionObserver = new IntersectionObserver((entries: IntersectionObserverEntry[], SELF) => {
  entries.forEach(entry => {
    const LDSrc = entry.target.getAttribute('data-src');

    if (LDSrc && entry.isIntersecting) {
      SELF.unobserve(entry.target);
      entry.target.setAttribute('src', LDSrc);
    }
  });
});
