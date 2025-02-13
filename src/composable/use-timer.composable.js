import { computed, ref, watch } from 'vue';
import moment from 'moment';

function useTimer(params) {
  let timer = null;
  const format = params?.format || 'x';

  const range = ref({
    from: 0,
    to: 0,
  });
  const time = ref(0);
  const running = ref(false);

  const step = computed(() => range.value.to - range.value.from > 0 ? 1000 : -1000);

  watch(time, (value) => {
    if (step.value < 0 && value <= range.value.to) stop();
    if (step.value > 0 && value >= range.value.to) stop();
  });

  function start() {
    running.value = true;
    timer = setInterval(() => {
      time.value += step.value;
    }, 1000);
  }
  function stop() {
    running.value = false;
    clearInterval(timer);
    timer = null;
  }
  function init(from, to) {
    range.value = {
      from: moment(from).valueOf(),
      to: moment(to).valueOf(),
    };
    time.value = range.value.from;
  }

  return {
    time: computed(() => moment(time.value).format(format)),
    init,
    start,
    stop,
    running,
  };
}

export default useTimer;
