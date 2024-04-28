<template>
  <div class="ball-container">
    <BallAnimation v-if="animationMode === BallAnimationModeEnum.HUNDRED_BALL_MOVE_TO_ONE_POINT" />
    <template v-else>
      <Ball
        v-for="(pos) in ballPositionOfBox"
        :position="pos"
        :animation-mode="props.animationMode"
        :data-pos="pos"
        :key="pos"
      />
    </template>
  </div>
</template>
<script lang="ts" setup>
import {
  ref, watch, nextTick,
} from 'vue';
import Ball from '@/components/BallContainer/Ball/index.vue';
import BallAnimation from '@/components/BallContainer/BallAnimation/index.vue';
import { BallAnimationModeEnum } from '@/assets/enum/ballAnimationModeEnum';

type Props = {
  animationMode: BallAnimationModeEnum
}

const props = withDefaults(defineProps<Props>(), {
  animationMode: BallAnimationModeEnum.TRANSLATE_RIGHT,
});

const ballPositionOfBox = ref([1, 3, 7, 9]);

const setBallPosition = () => {
  const headerHeight = 60;
  const boxPadding = 5;

  const calculatePosition = (
    boxRect: DOMRect,
    ballRect: DOMRect,
  ): { top: number; left: number } => {
    const boxInnerHeight = boxRect.height - boxPadding * 2;
    const top = boxRect.y - headerHeight + boxPadding + (boxInnerHeight / 2) - (ballRect.height / 2);
    const left = boxRect.x + boxRect.width / 2 - (ballRect.width / 2);
    return { top, left };
  };

  ballPositionOfBox.value.forEach((ballPos) => {
    const box = document.querySelector(`.box[data-pos="${ballPos}"]`) as HTMLElement;
    const ball = document.querySelector(`.ball[data-pos="${ballPos}"]`) as HTMLElement;

    if (box && ball) {
      const boxRect = box.getBoundingClientRect();
      const ballRect = ball.getBoundingClientRect();

      const { top, left } = calculatePosition(boxRect, ballRect);

      ball.style.top = `${top}px`;
      ball.style.left = `${left}px`;
    }
  });
};

const getRandomPosition = () => {
  const ballContainer = document.querySelector('.ball-container') as HTMLElement;
  const ballContainerRect = ballContainer.getBoundingClientRect();
  let randomTop = Math.floor(Math.random() * ballContainerRect.height - 30);
  let randomLeft = Math.floor(Math.random() * ballContainerRect.width - 30);

  randomTop = randomTop > 0 ? randomTop : 0;
  randomLeft = randomLeft > 0 ? randomLeft : 0;

  return { top: randomTop, left: randomLeft };
};

const moveToOnePoint = () => {
  const { top, left } = getRandomPosition();

  ballPositionOfBox.value.forEach((ballPos) => {
    const ball = document.querySelector(`.ball[data-pos="${ballPos}"]`) as HTMLElement;

    if (ball) {
      ball.style.top = `${top}px`;
      ball.style.left = `${left}px`;
    }
  });
};

const runAnimation = async (mode: BallAnimationModeEnum) => {
  await nextTick();

  setBallPosition();

  switch (mode) {
  case BallAnimationModeEnum.TRANSLATE_RIGHT:
    break;
  case BallAnimationModeEnum.MOVE_TO_ONE_POINT:
    moveToOnePoint();
    break;
  default:
  }
};

watch(() => props.animationMode, (newMode) => {
  runAnimation(newMode);
}, { immediate: true });
</script>
<style lang="scss" scoped>
.ball-container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
