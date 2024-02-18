import { ref } from 'vue';
import { UseToggle } from 'src/types/composition.type';

const useToggle: UseToggle = (value, look = false) => {
  const isToggle = ref<boolean>(value);
  const toggle = () => {
    if (look) return;
    isToggle.value = !isToggle.value;
  };

  return { isToggle, toggle };
};

export default useToggle;
