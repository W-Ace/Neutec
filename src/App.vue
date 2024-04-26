<template>
  <Header />
  <main class="main">
    <BoxGroup />
  </main>
</template>
<script lang='ts' setup>
import Header from '@/components/Header/index.vue';
import BoxGroup from '@/components/BoxGroup/index.vue';
</script>
<style lang="scss" scoped>
.main {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  background: #cbcbcb;
}
</style>
