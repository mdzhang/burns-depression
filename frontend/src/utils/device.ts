const ua = navigator.userAgent.toLowerCase();
export const isAndroid = ua.indexOf('android') > -1;
export const isIos = /ipad|iphone|ipod/.test(ua) && !(window as any).MSStream;

export function isMobileBrowser(): boolean {
  return isAndroid || isIos;
}

export function isMobileApp(): boolean {
  return navigator.product === 'ReactNative';
}
