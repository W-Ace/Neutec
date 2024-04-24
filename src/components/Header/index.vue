<template>
  <header class="header">
    <Hambuger @click="handleShowSidebar(true)" />
  </header>
  <Sidebar v-model:showSidebar="showSidebar" />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import Hambuger from '@/components/Header/Hamburger/index.vue';
import Sidebar from '@/components/Header/Sidebar/index.vue';

const showSidebar = ref(false);

const handleShowSidebar = (isShowSidebar: boolean) => {
  showSidebar.value = isShowSidebar;
};
</script>
<style lang="scss" scoped>
.header {
  height: 60px;
  padding: 10px;
  background: #fff;
}
</style>
