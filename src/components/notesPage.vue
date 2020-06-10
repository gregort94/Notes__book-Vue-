<template>
  <div class="notesPage">
    <header class="header">
      <div class="container">
        <button @click="addNoteHandler" class="header__add">add note</button>
      </div>
    </header>
    <section class="notes">
      <ul class="notes__body">
        <li v-for="(note, index) in notesData" :key="index" class="notes__note note">
          <transition name="fade">
            <confirm-window
              v-show="deletingNote === note"
              @cancel="clearDeletingData"
              text="Confirm remove"
              :buttons="[
                {name: 'delete', type: 'danger', handler: removeNoteHandler}
              ]"
            ></confirm-window>
          </transition>
          <h2 class="note__title">{{note.title}}</h2>
          <ul class="note__list">
            <li v-for="(value, index) in note.todos" :key="index" class="note__item">
              <div class="note__item-status">
                <div class="note__item-img">
                  <img v-if="value.done" class="fitImg" src="@/assets/img/icons/done.svg" alt />
                  <img else class="fitImg" src="@/assets/img/icons/process.svg" alt />
                </div>
              </div>
              <p class="note__item-text">{{value.text}}</p>
            </li>
          </ul>
          <div class="note__menu">
            <button class="note__menu-item">
              <img
                @click="$router.push(`/notes/${note.id}`)"
                src="@/assets/img/icons/edit.svg"
                alt="edit"
                class="fitImg"
              />
            </button>
            <button @click="setDeletingNote(note)" class="note__menu-item">
              <img src="@/assets/img/icons/remove.svg" alt="remove" class="fitImg" />
            </button>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import { mapActions } from "vuex";
import ConfirmWindow from "./ConfirmWindow";
export default {
  components: {
    ConfirmWindow
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["notesData", "editingNote", "deletingNote"])
  },
  methods: {
    ...mapMutations([
      "removeNote",
      "addNote",
      "setEditingNote",
      "closeEdit",
      "setDeletingNote",
      "clearDeletingData",
      "setDataFromLocalStorage"
    ]),
    ...mapActions(["removeNoteHandler", "addNoteHandler"])
  },
  created() {
    const localStorageData = localStorage.getItem("notesData");
    if (localStorageData) {
      const data = JSON.parse(localStorageData);
      this.setDataFromLocalStorage(data);
    }
  }
};
</script>

<style lang="scss">
@import "../scss/global/variables.scss";
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
