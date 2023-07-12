const debounce = (func, delay) => {
  var inDebounce;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
};

export default debounce;
