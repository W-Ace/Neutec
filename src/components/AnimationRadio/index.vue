<template>
  <div class="animation-radio">
    <input
      type="radio"
      id="ballAnimationMode1"
      name="ballAnimationMode"
      :value="BallAnimationModeEnum.TRANSLATE_RIGHT"
      v-model="ballAnimationMode"
    >
    <label for="ballAnimationMode1">向右移動</label>

    <input
      type="radio"
      id="ballAnimationMode2"
      name="ballAnimationMode"
      :value="BallAnimationModeEnum.MOVE_TO_ONE_POINT"
      v-model="ballAnimationMode"
    >
    <label for="ballAnimationMode2">4顆球某點</label>

    <!-- <input
      type="radio"
      id="ballAnimationMode3"
      name="ballAnimationMode"
      :value="BallAnimationModeEnum.HUNDRED_BALL_MOVE_TO_ONE_POINT"
      v-model="ballAnimationMode"
    >
    <label for="ballAnimationMode3">100顆球朝某點</label> -->
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';
import { BallAnimationModeEnum } from '@/assets/enum/ballAnimationModeEnum';

const ballAnimationMode = ref(BallAnimationModeEnum.TRANSLATE_RIGHT);

const emit = defineEmits<{
  'changeMode': [mode: BallAnimationModeEnum]
}>();

watch(() => ballAnimationMode.value, (newMode) => {
  emit('changeMode', newMode);
});
</script>
<style lang="scss" scope>
.animation-radio {
  font-size: 14px;
}
</style>
