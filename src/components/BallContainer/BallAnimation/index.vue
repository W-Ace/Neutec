<template>
  <div
    class="ball-animation"
    ref="ballAnimation"
  >
    <canvas
      class="ball-animation-canvas"
      ref="canvas"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

type Ball = {
  x: number
  y: number
  width: number
  height: number
  radius: number
}

const canvas = ref<HTMLCanvasElement | null>(null);
const ballAnimation = ref<HTMLDivElement | null>(null);
const balls = ref<Ball[]>([]);
const ballCount = 100;
const target = { x: 0, y: 0 };

const createBall = (containerWidth: number, containerHeight: number) => ({
  x: Math.random() * containerWidth,
  y: Math.random() * containerHeight,
  width: 30,
  height: 30,
  radius: 15,
});

const drawBall = (
  ctx: CanvasRenderingContext2D,
  ball: Ball,
) => {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = '#a5f12b';
  ctx.fill();
  ctx.closePath();
  ctx.fillStyle = 'black';
  ctx.font = '16px Arial';
  ctx.fillText('0', ball.x - 5, ball.y + 5);
};

const moveBallToTarget = (
  ball: Ball,
) => {
  const dx = target.x - ball.x;
  const dy = target.y - ball.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const speed = 2;

  if (dist > speed) {
    const moveX = (dx / dist) * speed;
    const moveY = (dy / dist) * speed;
    return {
      ...ball,
      x: ball.x + moveX,
      y: ball.y + moveY,
    };
  }
  return {
    ...ball,
    x: target.x,
    y: target.y,
  };
};

onMounted(() => {
  const ballAnimationEl = ballAnimation.value;
  const canvasEl = canvas.value;

  if (!ballAnimationEl || !canvasEl) return;

  const ballAnimationWidth = ballAnimationEl.clientWidth;
  const ballAnimationHeight = ballAnimationEl.clientHeight;

  canvasEl.width = ballAnimationWidth;
  canvasEl.height = ballAnimationHeight;

  target.x = ballAnimationWidth / 2;
  target.y = ballAnimationHeight / 2;

  balls.value = Array.from({ length: ballCount }, () => createBall(ballAnimationWidth, ballAnimationHeight));

  const ctx = canvas.value!.getContext('2d');

  const update = () => {
    if (!ctx) return;

    ctx.clearRect(0, 0, ballAnimationWidth, ballAnimationHeight);

    balls.value = balls.value.map(moveBallToTarget);

    balls.value.forEach((ball) => {
      drawBall(ctx, ball);
    });

    requestAnimationFrame(update);
  };

  update();
});
</script>
<style lang="scss">
@import '@/assets/scss/util/z-index';

.ball-animation {
  position: relative;
  z-index: $z-index-ball-animation;
  width: 100%;
  height: 100%;
}
</style>
