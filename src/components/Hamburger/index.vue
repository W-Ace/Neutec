<template>
  <div class="hambuger">
    <span class="hambuger-line" />
  </div>
</template>
<style lang="scss" scoped>
$primary-color: #666;

.hambuger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 40px;
  margin-left: auto;
  padding: 0 10px;
  border: 1px solid $primary-color;
  border-radius: 5px;
  background: #e8e8e8;
  cursor: pointer;
}

.hambuger-line {
  width: 15px;
  height: 1px;
  background-color: $primary-color;

  &::before, &::after {
    position: relative;
    left: 50%;
    display: block;
    width: 20px;
    height: 1px;
    background-color: $primary-color;
    content: '';
    transform: translateX(-50%);
  }

  &::before {
    top: -8px;
  }

  &::after {
    top: 8px;
  }
}
</style>
