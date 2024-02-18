import { computed } from 'vue';

function useModel<P extends object> (props:  P, emit: any, name: keyof P) {
  return computed({
    get() {
      return props[name];
    },
    set(value) {
      emit(`update:${name.toString()}`, value);
    }
  });
}
export default useModel;
