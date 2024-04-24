<template>
  <transition
    name="slide-right"
  >
    <aside
      v-show="props.showSidebar"
      class="sidebar"
    >
      1
    </aside>
  </transition>
  <div
    class="sidebar-mask"
    :class="showSidebar && 'sidebar-mask--open'"
    @click="closeSidebar"
  />
</template>
<script lang="ts" setup>

type Props = {
  showSidebar: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showSidebar: false,
});

const emit = defineEmits<{
  'update:showSidebar': [isShowSidebar: boolean]
}>();

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
  width: 190px;
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
