export const throttle = (cb: any, delay = 1000) => {
  let shouldWait = false;
  let waitingArgs: any;

  const timeoutFunc = () => {
    if (!waitingArgs) {
      shouldWait = false;
    } else {
      cb(...waitingArgs);
      waitingArgs = null;
      setTimeout(timeoutFunc, delay);
    }
  };

  return (...args: any) => {
    if (shouldWait) {
      waitingArgs = args;
      return;
    }
    cb(...args);
    shouldWait = true;
    setTimeout(timeoutFunc, delay);
  };
};
