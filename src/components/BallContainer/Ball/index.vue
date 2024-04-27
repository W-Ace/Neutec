<template>
  <div
    ref="ball"
    class="ball"
    :class="modeMapAnimationClassName.get(props.animationMode)"
  >
    0
  </div>
</template>
<script lang="ts" setup>
import { BallAnimationModeEnum } from '@/assets/enum/ballAnimationModeEnum';

type Props = {
  animationMode: BallAnimationModeEnum
}

const modeMapAnimationClassName = new Map([
  [BallAnimationModeEnum.TRANSLATE_RIGHT, 'ball--translate-right'],
  [BallAnimationModeEnum.MOVE_TO_ONE_POINT, 'ball--translate-to-one-point'],
]);

const props = withDefaults(defineProps<Props>(), {
  animationMode: BallAnimationModeEnum.TRANSLATE_RIGHT,
});
</script>
<style lang="scss" scoped>
@import '@/assets/scss/util/z-index.scss';

.ball {
  position: absolute;
  z-index: $z-index-ball;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background-color: #a5f12b;
  will-change: tranform;

  &.ball--translate-right {
    animation: translateRight 2s ease infinite;
  }

  &.ball--translate-to-one-point {
    transition: all 2s linear;
  }
}

@keyframes translateRight {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(250px);
  }
}
</style>
