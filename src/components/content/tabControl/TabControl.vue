<template>
  <div class="tab-control">
    <!--因为需求上看这里只是字不一样所以并没有使用插槽-->
    <div v-for="(item, index) in titles"
         :key="item"
         class="tab-control-item"
         @click="itemClick(index)">
      <span :class="{active:index === currentIndex}">{{item}}</span>
    </div>
  </div>
</template>
<script>
  export default {
    name: "TabControl",
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index;
        this.$emit('tabClick', index)
      }
    }
  }
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }
  .tab-control-item {
    flex: 1;
  }
  .tab-control-item span {
    padding: 5px;
  }
  .active {
    color: var(--color-high-text);
  }
  .active span {
    border-bottom: 3px solid var(--color-tint);
  }
</style>
