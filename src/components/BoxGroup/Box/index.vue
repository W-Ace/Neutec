<template>
  <div class="box">
    <div
      class="box-inner"
    >
      <div
        v-if="props.isFlash"
        class="box-inner-flash"
      />
    </div>
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

.box-inner-flash {
  width: 100%;
  height: 100%;
  background: #fff;
  animation: flash 0.5s ease-in-out infinite;
  will-change: opacity;
}

@keyframes flash {
  from {
    opacity: 0;
  }

  to {
    opacity: 0.2;
  }
}
</style>
