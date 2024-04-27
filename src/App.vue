<template>
  <Header @change-animation-mode="changeAnimationMode" />
  <main class="main">
    <BallContainer :animation-mode="ballAnimationMode" />
    <BoxGroup />
  </main>
</template>
<script lang='ts' setup>
import { ref } from 'vue';
import Header from '@/components/Header/index.vue';
import BallContainer from '@/components/BallContainer/index.vue';
import BoxGroup from '@/components/BoxGroup/index.vue';
import { BallAnimationModeEnum } from '@/assets/enum/ballAnimationModeEnum';

const ballAnimationMode = ref(BallAnimationModeEnum.TRANSLATE_RIGHT);

const changeAnimationMode = (newMode: BallAnimationModeEnum) => {
  ballAnimationMode.value = newMode;
};
</script>

<style lang="scss" scoped>
.main {
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  background: #cbcbcb;
}
</style>
