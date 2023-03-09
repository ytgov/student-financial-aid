<template lang="html">
  <div>
    <ul class="tabs__header">
      <li
        v-for="(tab, index) in tabs"
        :key="tab.title"
        @click="selectTab(index)"
        :class="{ tabs__selected: index == selectedIndex }"
      >
        {{ tab.title }}
      </li>
    </ul>
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedIndex: 0, // the index of the selected tab,
      tabs: [] // all of the tabs
    };
  },
  created() {
    this.tabs = this.$children;
  },
  mounted() {
    this.selectTab(0);
  },
  methods: {
    selectTab(i) {
      this.selectedIndex = i;

      // loop over all the tabs
      this.tabs.forEach((tab, index) => {
        tab.isActive = index === i;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
div {
  ul.tabs__header {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    border-bottom: solid 1px #ddd;
    > li {
      margin-left: 0.25rem;
      margin-right: 0.25rem;
      padding: 0.25rem 1rem;

      border: solid 1px #ddd;
      border-bottom: none;

      &:first-of-type {
        margin-left: 0;
      }

      &.tabs__selected {
        background: #ddd;
        color: #000;
      }

      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
