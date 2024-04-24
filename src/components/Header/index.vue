<template>
  <header class="header">
    <Hambuger />
  </header>
</template>
<script lang="ts" setup>
import Hambuger from '@/components/Header/Hamburger/index.vue';
</script>
<style lang="scss" scoped>
.header {
  height: 60px;
  padding: 10px;
  background: #fff;
}
</style>
