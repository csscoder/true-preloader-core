import StorageEvents from '@components/StorageEvents';
import DomElement from '@components/DomElement';

class Preloader {
  constructor() {
    this.el = 'preloader-box';
    this.templateID = 'preloader-template';
    this.props = document.querySelector(`script[data-preloader]`).dataset;
    this.storageEvents = new StorageEvents({
      templateID: this.templateID,
      props: this.props,
    });
    this.init();
  }

  fallBackTimer
  boundListener = this.listenerFunc.bind(this);

  removeTemplate() {
    window.templatePreloader = null;
  }

  listenerFunc() {
    this.domElement.remove();
    if (this.fallBackTimer) clearTimeout(this.fallBackTimer);
  }

  addListenerHide() {
    window.addEventListener('preloaderHide', this.boundListener, {
      once: true,
    });
  }

  init() {
    if (typeof window === 'undefined') {
      return false;
    }

    if (this.storageEvents.checkAllow()) {
      this.domElement = new DomElement(this);
      this.addListenerHide();
      this.fallbackTimeToHideInit();
    } else {
      this.removeTemplate();
    }
  }

  fallbackTimeToHideInit() {
    const timeFallback = this.props.timeFallback || 6000;
    this.fallBackTimer = setTimeout(() => {
      this.domElement.remove();
      window.removeEventListener('preloaderHide', this.boundListener);
    }, timeFallback);
  }
}

export { Preloader };
