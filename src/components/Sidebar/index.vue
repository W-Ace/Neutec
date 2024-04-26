<template>
  <transition
    name="slide-right"
  >
    <aside
      v-show="props.showSidebar"
      class="sidebar"
    >
      <Menu
        :menu-list="drinks"
      />
    </aside>
  </transition>
  <div
    class="sidebar-mask"
    :class="showSidebar && 'sidebar-mask--open'"
    @click="closeSidebar"
  />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import Menu from '@/components/Menu/index.vue';
import mockDrinkData from '@/assets/data/drink';

type Props = {
  showSidebar: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showSidebar: false,
});

const emit = defineEmits<{
  'update:showSidebar': [isShowSidebar: boolean]
}>();

const drinks = ref(mockDrinkData);

const closeSidebar = () => {
  emit('update:showSidebar', false);
};

</script>
<style lang="scss" scoped>
@import '@/assets/scss/animation/slide-right.scss';
@import '@/assets/scss/util/z-index.scss';

.sidebar {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: $z-index-sidebar;
  width: 220px;
  padding: 10px;
  overflow: auto;
  background: #333;
}

.sidebar-mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: $z-index-sidebar-mask;
  display: none;

  &.sidebar-mask--open {
    display: block;
  }
}
</style>
