<template>
  <svg
    aria-hidden="true"
    class="svg-icon"
    :style="{
      height: `${size}px`,
      width: `${size}px`
    }"
  >
    <use
      :href="iconName"
      :fill="color"
    />
  </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

type Props = {
  name: string
  size: number | string
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  name: '',
  size: 20,
  color: 'none',
});

const iconName = computed(() => `#icon-${props.name}`);

</script>

<style lang="scss" scoped>
.svg-icon {
  outline: none;
}
</style>
