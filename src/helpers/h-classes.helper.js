export function hClasses(rootClass) {
  const classes = [rootClass];

  const append = (cls) => {
    classes.push(cls);

    return this;
  };

  const mixin = () => {
    return {
      append: (cls) => append(`${rootClass}--${cls}`),
    };
  };

  return {
    value: () => classes.join(' '),
    mixin,
  };
}
