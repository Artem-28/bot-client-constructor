import { ref } from 'vue';

const zoom = ref(1);

export default function(min = 0.25, max = 2) {
  function zoomOut(step = 0.05) {
    const value = Math.round((zoom.value - step) * 100) / 100;
    if (value < min) return;
    console.log('value', value);
    zoom.value = value;
  }
  function zoomIn(step = 0.05) {
    const value = Math.round((zoom.value + step) * 100) / 100;
    if (value > max) return;
    zoom.value = value;
  }

  return {
    zoom,
    zoomOut,
    zoomIn,
  };
}
