<template>
  <div class="box">
    <div
      class="box-inner"
      :class="props.isFlash && 'box-inner--flash'"
    />
  </div>
</template>
<script lang="ts" setup>
type Props = {
  isFlash: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isFlash: false,
});
</script>
<style lang="scss" scoped>
.box {
  flex: 0 0 33.333333%;
  padding: 5px;
}

.box-inner {
  height: 100px;
  border: black solid 2px;
  background: radial-gradient(circle, rgba(113, 81, 95, 1) 81%, rgba(0, 0, 0, 1) 100%);
}

.box-inner--flash {
  animation: flash 0.6s ease-in-out alternate infinite;
  will-change: opacity;
}

@keyframes flash {
  from {
    opacity: 1;
  }

  to {
    opacity: 0.6;
  }
}
</style>
