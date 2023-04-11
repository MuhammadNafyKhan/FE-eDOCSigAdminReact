export function debounce(cb: any, delay = 1000) {
  let timeout: any = null;
  return (...args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args, delay);
    });
  };
}
