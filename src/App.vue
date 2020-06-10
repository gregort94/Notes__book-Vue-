<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
  created() {
    this.$store.commit("setDataFromLocalStorage");
  }
};
</script>

<style lang="scss">
@import "scss/global/variables.scss";
.header {
  padding: 15px;
}
.notes {
  &__body {
    display: grid;
    grid-template-columns: repeat(auto-fill, 300px);
    grid-template-rows: repeat(auto-fill, 300px);
    grid-gap: 15px;
    justify-content: space-around;
  }
  &__note {
    &:nth-child(3n) {
      background-color: $noteBG1;
    }
    &:nth-child(3n + 1) {
      background-color: $noteBG2;
    }
    &:nth-child(3n-1) {
      background-color: $noteBG3;
    }
  }
}
.note {
  position: relative;
  overflow: hidden;
  background-color: $noteBG1;
  padding: 15px;
  border-radius: 1px;
  &__title {
  }

  &__list {
  }

  &__item {
    display: flex;
  }

  &__item-status {
  }
  &__item-img {
    position: relative;
    width: 25px;
    height: 25px;
  }
  &__item-text {
    overflow: hidden;
  }
  &__menu {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    background-color: rgba(7, 7, 7, 0.452);
    display: none;
  }
  &__menu-item {
    position: relative;
    width: 30px;
    height: 30px;
    margin: 5px;
    padding: 0;
    &:hover {
      img {
        fill: olive;
      }
    }
  }
  &:hover {
    .note__menu {
      display: block;
    }
  }
}
</style>
