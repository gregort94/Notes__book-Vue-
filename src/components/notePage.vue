<template>
  <section class="notePage">
    <div @click.self="closeWinActive = true" class="overlay notePage__overlay">
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
              {name: 'Close', type: 'close', handler: closeEdit}
            ]"
          ></confirm-window>
        </transition>
        <button :disabled="!changed" class="notePage__save">Save</button>
        <button @click="setDeletingNote(sourceData)" type="button" class="notePage__delete">Delete</button>
        <button :disabled="!changed" @click="copySourceData" class="notePage__cancel">Cancel changes</button>
        <div class="notePage__title">
          <input ref="title" type="text" v-model="currentData.title" class="notePage__title-input" />
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

        <button type="button" @click="addTodo" class="notePage__add">+</button>
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
    }
  },
  watch: {
    sourceData() {
      if (!this.sourceData) {
        this.$router.push("/notes");
      }
    }
  },
  created() {
    this.copySourceData();
    document.addEventListener("keydown", e => {
      if (e.code === "Escape") {
        this.closeWinActive = true;
      }
    });
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
  }
  &__save {
    position: absolute;
    top: 15px;
    right: 15px;
  }
  &__delete {
    position: absolute;
    top: 15px;
    right: 80px;
  }
  &__cancel {
    position: absolute;
    left: 15px;
    right: 150px;
  }
  &__title {
    display: flex;
    justify-content: center;
    &-input {
      text-align: center;
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