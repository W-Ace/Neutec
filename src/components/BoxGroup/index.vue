<template>
  <div class="box-group">
    <Box
      v-for="(i) in boxAmount"
      :key="i"
      :is-flash="isFlashEnabled(i)"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import Box from '@/components/BoxGroup/Box/index.vue';

const boxAmount = ref(9);
const enableFlash = ref(new Set([3, 5, 9]));

const isFlashEnabled = (index: number) => enableFlash.value.has(index);
</script>
<style lang="scss" scoped>
.box-group {
  display: flex;
  flex-wrap: wrap;
  padding: 0 5px;
}
</style>
