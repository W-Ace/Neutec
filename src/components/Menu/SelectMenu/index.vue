<template>
  <select
    class="select-menu"
    v-model="selectedMenu"
    @change="select"
  >
    <option
      v-for="(menu) in menuOptions"
      :data-key-path="menu.keyPath"
      :value="menu.key"
      :key="menu.key"
    >
      {{ menu.text }}
    </option>
  </select>
</template>
<script lang="ts" setup>
import { ref, onBeforeMount, defineEmits } from 'vue';
import type { MenuItem } from '@/assets/data/drink';
import mockDrinkData from '@/assets/data/drink';

type MenuOption = MenuItem & {
  keyPath?: Array<MenuItem['key']>
}

const emit = defineEmits<{
  'select': []
}>();

const flattenMenu = (drinks: Array<MenuItem>, output: Array<MenuOption> = [], keyPath: MenuOption['keyPath'] = []) => {
  drinks.forEach((drink) => {
    const copyKeyPath = [...keyPath, drink.key];
    output.push({
      keyPath: [...copyKeyPath],
      key: drink.key,
      text: drink.text,
    });

    if (drink.children) {
      flattenMenu(drink.children, output, copyKeyPath);
      copyKeyPath.pop();
    }
  });

  return output;
};

const menuOptions = ref<Array<MenuOption>>([]);
const selectedMenu = ref<MenuItem['key']>('');

const select = (event: Event) => {
  const selectElement = event.target as HTMLSelectElement;
  const selectedOption = selectElement.selectedOptions[0];
  const keyPathArray = selectedOption?.dataset?.keyPath?.split(',') || [];

  localStorage.setItem('selectedMenuKey', JSON.stringify(keyPathArray));

  emit('select');
};

const setMenuOptions = () => {
  menuOptions.value = flattenMenu(mockDrinkData);
};

const setDefaultSelectedMenu = () => {
  const storedMenuKey = JSON.parse(localStorage.getItem('selectedMenuKey') || '[]');

  if (Array.isArray(storedMenuKey) && storedMenuKey.length > 0) {
    selectedMenu.value = storedMenuKey[storedMenuKey.length - 1];

    return;
  }

  const [firstOption] = menuOptions.value;
  selectedMenu.value = firstOption.key;
};

onBeforeMount(() => {
  setMenuOptions();
  setDefaultSelectedMenu();
});
</script>
<style lang="scss" scoped>
.select-menu {
  width: 100%;
  padding: 5px;
  font-size: 16px;
}
</style>
