export function hClasses(rootClass) {
  const classes = [rootClass];

  function append(cls) {
    classes.push(cls);

    return this;
  }

  function mixin() {
    return {
      append: (cls) => append.bind(this)(`${rootClass}--${cls}`),
    };
  }

  return {
    value: () => classes.join(' '),
    mixin,
  };
}
