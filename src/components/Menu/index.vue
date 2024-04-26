<template>
  <ul class="menu">
    <li
      class="menu-item"
      v-for="(menuItem) in props.menuList"
      :key="menuItem?.key"
    >
      <div
        class="menu-item-desc"
        :class="isCurrentKey(menuItem?.key) && 'menu-item-desc--active'"
        @click="toggleMenu(menuItem?.key)"
      >
        <SvgIcon
          v-if="menuItem.children"
          class="menu-item-arrow"
          name="arrow-right"
          :size="15"
        />
        <div class="menu-item-text">
          {{ menuItem?.text || '' }}
        </div>
      </div>
      <Menu
        v-if="menuItem.children && isCurrentKey(menuItem?.key)"
        :parent-key="menuItem.key"
        :menu-list="menuItem.children"
        :level="props.level + 1"
      />
    </li>
  </ul>
</template>
<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';
import Menu from '@/components/Menu/index.vue';
import SvgIcon from '@/components/SvgIcon/index.vue';

type MenuItem = {
  key: string
  text: string
  children?: Array<MenuItem>
}

type Props = {
  parentKey?: MenuItem['key']
  level?: number
  menuList: Array<MenuItem>
}

const props = withDefaults(defineProps<Props>(), {
  parentKey: '',
  menuList: () => [],
  level: 0,
});

const activeKey = ref('');

const getStoredKey = (): string[] => JSON.parse(localStorage.getItem('selectedMenuKey') || '[]');

const persistKey = (menuKey: string, isClose: boolean) => {
  const selectedMenuKey = getStoredKey();

  const storeMenuKey = (storeKeyPath: string[]) => {
    localStorage.setItem('selectedMenuKey', JSON.stringify(storeKeyPath));
  };

  if (isClose) {
    const targetMenuKeyIndex = selectedMenuKey.findIndex((key) => key === menuKey);
    const splicedKeyPath = selectedMenuKey.slice(0, targetMenuKeyIndex);

    storeMenuKey(splicedKeyPath);

    return;
  }

  let keyPath: string[] = [];

  if (!props.parentKey) {
    keyPath.push(menuKey);
    storeMenuKey(keyPath);
    return;
  }

  if (selectedMenuKey.length) {
    const parentIndex = selectedMenuKey.findIndex((key) => key === props.parentKey);

    const isTheSameGroup = () => parentIndex >= 0;

    if (isTheSameGroup()) {
      keyPath = selectedMenuKey;
      keyPath[parentIndex + 1] = menuKey;
    }
  } else {
    keyPath.push(menuKey);
  }

  storeMenuKey(keyPath);
};

const toggleMenu = (menuKey: string) => {
  if (activeKey.value === menuKey) {
    activeKey.value = '';

    persistKey(menuKey, true);

    return;
  }

  activeKey.value = menuKey;

  persistKey(menuKey, false);
};

const isCurrentKey = (menuKey: string) => activeKey.value === menuKey;

const highlightByStoreKey = () => {
  const selectedMenuKey = getStoredKey();

  activeKey.value = selectedMenuKey[props.level];
};

onBeforeMount(() => {
  highlightByStoreKey();
});
</script>
<style lang="scss" scoped>
.menu {
  padding: 10px 0 10px 15px;

  .menu {
    padding: 10px 0 0 15px;
  }
}

.menu-item {
  margin-bottom: 15px;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
}

.menu-item-desc {
  position: relative;
  display: flex;
  align-items: center;

  &.menu-item-desc--active {
    .menu-item-text {
      color: yellow;
    }

    .menu-item-arrow {
      transform: translateY(-50%) rotate(90deg);
    }
  }
}

.menu-item-text {
  padding-left: 25px;
}

.menu-item-arrow {
  position: absolute;
  top: 50%;
  left: 0;
  transition: transform 0.2s ease-in-out;
  transform: translateY(-50%);
}
</style>
