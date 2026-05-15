const callback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const lazyElement = entry.target;

      if (lazyElement instanceof HTMLImageElement) {
        if (lazyElement.dataset.src) {
          lazyElement.src = lazyElement.dataset.src;
          delete lazyElement.dataset.src;
        }
        if (lazyElement.dataset.srcset) {
          lazyElement.srcset = lazyElement.dataset.srcset;
          delete lazyElement.dataset.srcset;
        }
      }

      if (lazyElement instanceof HTMLVideoElement) {
        if (lazyElement.dataset.src) {
          lazyElement.src = lazyElement.dataset.src;
          delete lazyElement.dataset.src;
        }
      }

      lazyElement.classList.remove('lazy');
      lazyElement.classList.add('lazy--loaded');
      observer.unobserve(lazyElement);
    }
  });
};

const lazyLoad = () => {
  const selector = '.lazy';

  const options = {
    root: null, // null === window
    rootMargin: '100% 100% 100% 100%',
    threshold: [0],
  };

  const lazyElements = Array.from(document.querySelectorAll(selector));
  const observerForLazyElements = new IntersectionObserver(callback, options);

  lazyElements.forEach((lazyElement) => {
    observerForLazyElements.observe(lazyElement);
  });
};

export default lazyLoad;
