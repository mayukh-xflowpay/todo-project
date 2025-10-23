export const debounce = (callback: Function, wait: number) => {
  let timerID: number;
  return (...args: any[]) => {
    window.clearTimeout(timerID);

    timerID = window.setTimeout(() => {
      console.log(...args);
      callback.apply(this, args);
      // callback(args);
    }, wait);
  };
};
