<template>
  <section class="notePage">
    <div @click.self="closeWinActive = true" class="overlay notePage__overlay">
      <button type="button" @click.self="closeWinActive = true" class="notePage__close">Back</button>
      <form @submit.prevent="saveChangesHandler" class="notePage__body">
        <transition name="fade">
          <confirm-window
            v-show="deletingNote === sourceData"
            @cancel="clearDeletingData"
            text="Confirm remove"
            :buttons="[
              {name: 'delete', type: 'danger', handler: removeNoteHandler}
            ]"
          ></confirm-window>
        </transition>
        <transition name="fade">
          <confirm-window
            v-show="closeWinActive"
            @cancel="closeWinActive = false"
            text="Close note ?"
            :buttons="[
              {name: 'Close', type: 'close', handler: closeNotePage}
            ]"
          ></confirm-window>
        </transition>
        <button :disabled="!changed" class="notePage__save">Save</button>
        <button @click="setDeletingNote(sourceData)" type="button" class="notePage__delete">Delete</button>
        <button :disabled="!changed" @click="copySourceData" class="notePage__cancel">Cancel changes</button>
        <div class="notePage__title">
          <input
            type="text"
            v-model="currentData.title"
            placeholder="set title"
            class="notePage__title-input"
          />
        </div>
        <ul class="notePage__list">
          <li v-for="(todo, index) in currentData.todos" :key="index" class="todo">
            <input v-model="todo.done" type="checkbox" class="todo__checkbox" />
            <input ref="input" required v-model="todo.text" type="text" class="todo__text" />
            <button type="button" @click="currentData.todos.splice(index, 1)" class="todo__delete">
              <img src="@/assets/img/icons/cross.svg" alt />
            </button>
          </li>
        </ul>
        <a @click="addTodo" class="notePage__add">
          <svg
            class="fitImg"
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
      </form>
    </div>
  </section>
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
    return {
      currentData: false,
      closeWinActive: false
    };
  },
  computed: {
    ...mapGetters(["deletingNote", "notesData"]),
    id() {
      return +this.$route.params.id;
    },
    sourceData() {
      return this.notesData.find(note => note.id === this.id);
    },
    changed() {
      return (
        JSON.stringify(this.sourceData) !== JSON.stringify(this.currentData)
      );
    }
  },
  methods: {
    ...mapMutations([
      "setDeletingNote",
      "removeNote",
      "clearDeletingData",
      "closeEdit",
      "localStorageSync"
    ]),
    ...mapActions(["removeNoteHandler"]),
    saveChangesHandler() {
      console.log(1);
      this.sourceData.title = this.currentData.title;
      this.sourceData.todos = JSON.parse(
        JSON.stringify(this.currentData.todos)
      );
      this.localStorageSync();
    },
    addTodo() {
      this.currentData.todos.push({ done: false, text: "" });
      setTimeout(() => {
        this.focusOnLastInput();
      }, 100);
    },
    focusOnLastInput() {
      const lastInputIndex = this.currentData.todos.length - 1;
      const lastInput = this.$refs.input[lastInputIndex];
      lastInput.focus();
    },
    copySourceData() {
      this.currentData = JSON.parse(JSON.stringify(this.sourceData));
    },
    closeNotePage() {
      this.$router.push("/notes");
    }
  },
  watch: {},
  created() {
    if (!this.sourceData) {
      this.$router.push("/notes");
      return;
    }
    this.copySourceData();
  }
};
</script>



<style lang="scss">
@import "../scss/global/variables.scss";
.notePage {
  &__overlay {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__body {
    padding: 15px 15px 15px 15px;
    background-color: #fff;
    width: 500px;
    height: 500px;
    background-color: $noteBG1;
    border-radius: 1px;
    position: relative;
    overflow: auto;
    @media (max-width: $xs) {
      padding: 55px 15px 15px 15px;
    }
    @media (max-width: $sm) {
      margin: 95px 0px 0px 0px;
      width: 100%;
      height: 100%;
    }
  }
  &__save {
    position: absolute;
    top: 15px;
    right: 15px;
    background-color: $goodBtn;
    &:disabled {
      background-color: rgb(151, 182, 162);
    }
  }
  &__delete {
    position: absolute;
    top: 15px;
    right: 80px;
    background-color: $danger;
    color: white;
  }
  &__cancel {
    position: absolute;
    top: 15px;
    left: 15px;
    background-color: $cancelBtn;
    &:disabled {
      background-color: rgb(151, 175, 182);
    }
  }
  &__title {
    display: flex;
    justify-content: center;
    &-input {
      text-align: center;
    }
  }
  &__close {
    position: absolute;
    top: 15px;
    left: 15px;
    padding: 10px;
    background-color: $noteBG1;
    border-radius: 5px;
    &:hover {
      background-color: darken($noteBG1, 10%);
    }
    @media (max-width: $sm) {
      top: 0;
      left: 0;
      width: 100%;
      border-bottom: 1px solid #000;
      background-color: $noteBG3;
    }
  }
  &__add {
    position: relative;
    width: 30px;
    height: 30px;
    display: block;
    cursor: pointer;
    margin: 10px 0px 0px 0px;
    &:hover {
      svg {
        fill: #33caca;
      }
    }
    svg {
      fill: #0c2929;
    }
  }
  &__list {
  }
}

.todo {
  margin: 10px 0px 10px 0px;
  display: flex;
  position: relative;
  &__checkbox {
    transform: scale(2.3) translatey(3.7px);
    margin: 0px 15px 0px 9px;
  }
  &__text {
    flex: 1 0 0;
  }
  &__delete {
    position: absolute;
    padding: 5px;
    right: 0;
    top: 0;
    width: 25px;
    height: 100%;
    margin: 0;
  }
}
</style>