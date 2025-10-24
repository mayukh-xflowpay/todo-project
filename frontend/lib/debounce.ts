export const debounce = (callback: Function, wait: number) => {
  let timerID: number;
  return (...args: any[]) => {
    window.clearTimeout(timerID);

    timerID = window.setTimeout(() => {
      callback.apply(this, args);
    }, wait);
  };
};
