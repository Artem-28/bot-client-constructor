import { getCurrentInstance, watch } from 'vue';

export const useModelToggleEmits = [
  'beforeShow', 'show', 'beforeHide', 'hide',
];

export function useToggle({ showing, showHandle, hideHandle }) {
  const instance = getCurrentInstance();

  function emit(event, ...args) {
    instance.emit(event, ...args);
  }

  function processHide() {
    if (!showing.value) return;
    showing.value = false;
    emit('beforeHide');
    typeof hideHandle === 'function' ? hideHandle() : emit('hide');
  }

  const processShow = () => {
    if (showing.value) return;
    showing.value = true;
    emit('beforeShow');
    typeof showHandle === 'function' ? showHandle() : emit('show');
  };

  function show() {
    if (instance.props.disable) return;
    emit('update:modelValue', true);
    processShow();
  }

  function hide() {
    if (instance.props.disable) return;
    emit('update:modelValue', false);
    processHide();
  }

  function toggle() {
    showing.value ? hide() : show();
  }

  function processModelChange(val) {
    val ? processShow() : processHide();
  }

  watch(() => instance.props.modelValue, (val) => processModelChange(val));

  return { show, hide, toggle };
}
