import { ref } from 'vue';
import blockList from '../blocks';

export default function() {
  const blocks = ref([]);

  async function getBlocks() {
    blocks.value = blockList;
  }

  return {
    blocks,
    getBlocks,
  };
}
