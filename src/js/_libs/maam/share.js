import Util from './Mutil.js';

const share = (className) => {
  const shareButtons = Array.from(
    document.querySelectorAll(className),
  );
  const pageTitle = document.title;
  const pageUrl = window.location.origin + window.location.pathname;
  const eventHandler = (element, apiUrl) => {
    const util = new Util();
    const { device } = util;

    const open = (e) => {
      e.preventDefault();

      switch (device) {
        case 'sp':
        case 'tablet':
          window.open(
            apiUrl,
            '_blank',
            'width=550, height=450, personalbar=0, toolbar=0, scrollbars=1, resizable=1',
          );
          break;

        default:
          window.open(
            apiUrl,
            'sharewindow',
            'width=550, height=450, personalbar=0, toolbar=0, scrollbars=1, resizable=1',
          );
          break;
      }
    };
    element.addEventListener('click', open, false);
  };

  shareButtons.forEach((element) => {
    const hrefHash = element.href.split('#')[1];
    let apiUrl;
    switch (hrefHash) {
      case 'fb':
        apiUrl = `http://www.facebook.com/sharer.php?u=${pageUrl}`;
        break;

      case 'tw':
        apiUrl = `https://twitter.com/share?text=${encodeURI(
          pageTitle,
        )}&url=${encodeURI(pageUrl)}`;
        break;

      case 'line':
        apiUrl = `http://line.me/R/msg/text/?${encodeURI(
          pageTitle,
        )} ${encodeURI(pageUrl)}`;
        break;

      default:
        throw new Error('一致するサービスがありません。');
    }

    eventHandler(element, apiUrl);
  });
};

export default share;
