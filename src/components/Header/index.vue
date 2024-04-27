<template>
  <header class="header">
    <AnimationRadio @change-mode="changeAnimationMode" />
    <Hambuger @click="handleShowSidebar(true)" />
  </header>
  <Sidebar v-model:showSidebar="showSidebar" />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import AnimationRadio from '@/components/AnimationRadio/index.vue';
import Hambuger from '@/components/Hamburger/index.vue';
import Sidebar from '@/components/Sidebar/index.vue';
import { BallAnimationModeEnum } from '@/assets/enum/ballAnimationModeEnum';

const emit = defineEmits<{
  'changeAnimationMode': [mode: BallAnimationModeEnum]
}>();

const showSidebar = ref(false);

const changeAnimationMode = (newMode: BallAnimationModeEnum) => {
  emit('changeAnimationMode', newMode);
};

const handleShowSidebar = (isShowSidebar: boolean) => {
  showSidebar.value = isShowSidebar;
};
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  height: 60px;
  padding: 10px;
  background: #fff;
}
</style>
