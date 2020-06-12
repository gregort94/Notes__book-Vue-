<template>
  <div class="notesPage">
    <header class="header">
      <div class="container">
        <a @click="addNoteHandler" class="header__add">
          <svg
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 512 512"
            style="enable-background:new 0 0 512 512;"
            xml:space="preserve"
          >
            <g>
              <g>
                <path
                  d="M256,0C114.833,0,0,114.833,0,256s114.833,256,256,256s256-114.853,256-256S397.167,0,256,0z M256,472.341
			c-119.275,0-216.341-97.046-216.341-216.341S136.725,39.659,256,39.659S472.341,136.705,472.341,256S375.295,472.341,256,472.341z
			"
                />
              </g>
            </g>
            <g>
              <g>
                <path
                  d="M355.148,234.386H275.83v-79.318c0-10.946-8.864-19.83-19.83-19.83s-19.83,8.884-19.83,19.83v79.318h-79.318
			c-10.966,0-19.83,8.884-19.83,19.83s8.864,19.83,19.83,19.83h79.318v79.318c0,10.946,8.864,19.83,19.83,19.83
			s19.83-8.884,19.83-19.83v-79.318h79.318c10.966,0,19.83-8.884,19.83-19.83S366.114,234.386,355.148,234.386z"
                />
              </g>
            </g>
          </svg>
        </a>
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
            <button @click="setDeletingNote(note)" class="note__menu-item note__menu-item--remove">
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
@import "../scss/global/mixins.scss";
$addBtnFill: #22b4b4;
.header {
  padding: 15px;
  &__add {
    color: white;
    position: relative;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: block;
    cursor: pointer;
    &:hover {
      svg {
        fill: darken($addBtnFill, 10%);
      }
    }
    svg {
      fill: $addBtnFill;
    }
  }
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
    font-size: 30px;
    text-align: center;
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
    margin: 0px 5px 5px 0px;
  }
  &__item-text {
    overflow: hidden;
    @include unusual;
  }
  &__menu {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    background-color: rgba(7, 7, 7, 0.452);
    display: none;
    border-radius: 0 0 0 5px;
  }
  &__menu-item {
    position: relative;
    width: 30px;
    height: 30px;
    margin: 5px;
    padding: 0;
    &:hover {
    }
  }
  &:hover {
    .note__menu {
      display: block;
    }
  }
}
</style>
