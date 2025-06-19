import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { useTimeout } from 'src/composable/index';

const useResizeObserver = (targetRef, cb, debounce = 0) => {
  let targetEl = null;
  let observer = null;
  const size = ref({ width: -1, height: -1 });
  const { start: startTimer, stop: stopTimer } = useTimeout(emitEvent, debounce);

  function emitEvent() {
    stopTimer();
    if (!targetEl) return;
    const { offsetWidth: width, offsetHeight: height } = targetEl;

    if (width === size.value.width && height === size.value.height) return;

    size.value.width = width;
    size.value.height = height;
    if (typeof cb === 'function') cb(size.value);
  }

  function trigger() {
    window.requestAnimationFrame(() => {
      if (debounce === 0) {
        emitEvent();
        return;
      }
      startTimer();
    });
  }

  function init(stop = false) {
    if (targetRef.value) {
      targetEl = targetRef.value.$el || targetRef.value;
      observer = new ResizeObserver(trigger);
      observer.observe(targetEl);
      return;
    }
    if (!stop) {
      nextTick(() => init(true));
    }
  }

  onMounted(() => init());

  onBeforeUnmount(() => {
    observer.disconnect();
    observer = null;
    targetEl = null;
  });

  return {
    size: computed(() => size.value),
  };
};

export default useResizeObserver;
