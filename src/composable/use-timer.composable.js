import { computed, ref, watch } from 'vue';
import moment from 'moment';

function useTimer(params) {
  let timer = null;
  const format = params?.format || 'mm:ss';

  const range = ref({
    from: 0,
    to: 0,
  });

  const time = ref(0);

  const step = computed(() => range.value.to - range.value.from > 0 ? 1000 : -1000);
  const formatTime = computed(() => moment(time.value).format(format));

  watch(time, (value) => {
    if (step.value < 0 && value <= range.value.to) stop();
    if (step.value > 0 && value >= range.value.to) stop();
  });

  function start() {
    timer = setInterval(() => {
      time.value += step.value;
    }, 1000);
  }
  function stop() {
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
    time,
    formatTime,
    init,
    start,
    stop,
  };
}

export default useTimer;
