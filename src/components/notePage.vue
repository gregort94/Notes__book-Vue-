<template>
  <section class="notePage">
    <div @click.self="closeWinActive = true" class="overlay notePage__overlay">
      <a @click="closeWinActive = true" type="button" class="notePage__close">
        <svg
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 477.862 477.862"
          style="enable-background:new 0 0 477.862 477.862;"
          xml:space="preserve"
        >
          <g>
            <path
              d="M187.722,102.856V17.062C187.719,7.636,180.076-0.003,170.65,0c-4.834,0.001-9.44,2.053-12.676,5.644L4.375,176.311
			c-5.617,6.256-5.842,15.67-0.529,22.187l153.6,187.733c5.968,7.295,16.72,8.371,24.016,2.403c3.952-3.233,6.249-8.066,6.26-13.172
			v-85.043c134.827,4.386,218.965,62.02,256.888,175.787c2.326,6.96,8.841,11.653,16.179,11.656c0.92,0.003,1.84-0.072,2.748-0.222
			c8.256-1.347,14.319-8.479,14.319-16.845C477.855,259.818,356.87,112.174,187.722,102.856z"
            />
          </g>
        </svg>
      </a>
      <form @submit.prevent="saveChangesHandler" class="notePage__body">
        <transition name="fade">
          <confirm-window
            v-show="deletingNote === sourceData"
            @cancel="clearDeletingData"
            text="Confirm remove"
            :buttons="[
              {name: 'Delete', type: 'danger', handler: removeNoteHandler}
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
        <button :disabled="!changed" class="btn btn--success notePage__save">Save</button>
        <button
          @click="setDeletingNote(sourceData)"
          type="button"
          class="btn btn--danger notePage__delete"
        >Delete</button>
        <button
          :disabled="!changed"
          @click="copySourceData"
          class="btn btn--info notePage__cancel"
        >Cancel changes</button>
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
            <div class="todo__checkbox">
              <input
                :id="`chekControl${index}`"
                class="inputControl todo__checkbox-control"
                v-model="todo.done"
                type="checkbox"
              />
              <label :for="`chekControl${index}`" class="todo__checkbox-label"></label>
            </div>
            <input ref="input" required v-model="todo.text" type="text" class="todo__text" />
            <button type="button" @click="currentData.todos.splice(index, 1)" class="todo__delete">
              <svg
                class="fitImg"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                width="408.483px"
                height="408.483px"
                viewBox="0 0 408.483 408.483"
                style="enable-background:new 0 0 408.483 408.483;"
                xml:space="preserve"
              >
                <g>
                  <g>
                    <path
                      d="M87.748,388.784c0.461,11.01,9.521,19.699,20.539,19.699h191.911c11.018,0,20.078-8.689,20.539-19.699l13.705-289.316
			H74.043L87.748,388.784z M247.655,171.329c0-4.61,3.738-8.349,8.35-8.349h13.355c4.609,0,8.35,3.738,8.35,8.349v165.293
			c0,4.611-3.738,8.349-8.35,8.349h-13.355c-4.61,0-8.35-3.736-8.35-8.349V171.329z M189.216,171.329
			c0-4.61,3.738-8.349,8.349-8.349h13.355c4.609,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.737,8.349-8.349,8.349h-13.355
			c-4.61,0-8.349-3.736-8.349-8.349V171.329L189.216,171.329z M130.775,171.329c0-4.61,3.738-8.349,8.349-8.349h13.356
			c4.61,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.738,8.349-8.349,8.349h-13.356c-4.61,0-8.349-3.736-8.349-8.349V171.329z"
                    />
                    <path
                      d="M343.567,21.043h-88.535V4.305c0-2.377-1.927-4.305-4.305-4.305h-92.971c-2.377,0-4.304,1.928-4.304,4.305v16.737H64.916
			c-7.125,0-12.9,5.776-12.9,12.901V74.47h304.451V33.944C356.467,26.819,350.692,21.043,343.567,21.043z"
                    />
                  </g>
                </g>
              </svg>
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
@import "../scss/global/mixins.scss";
.notePage {
  &__overlay {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__body {
    padding: 15px 15px 15px 15px;
    background-color: #fff;
    width: 600px;
    height: 600px;
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
    color: white;
  }
  &__delete {
    position: absolute;
    top: 15px;
    right: 80px;
    color: white;
  }
  &__cancel {
    position: absolute;
    top: 15px;
    left: 15px;
    color: white;
  }
  &__title {
    display: flex;
    justify-content: center;
    &-input {
      text-align: center;
      height: 40px;
      border: 0;
      background-color: $noteBG1;
      font-size: 30px;
      @include bold;
      width: 280px;
    }
  }
  &__close {
    position: absolute;
    top: 15px;
    left: 15px;
    padding: 10px;
    background-color: $noteBG1;
    border-radius: 5px;
    width: 50px;
    height: 50px;
    cursor: pointer;
    &:hover {
      background-color: darken($noteBG1, 10%);
    }
    @media (max-width: $sm) {
      top: 0;
      left: 0;
      width: 100%;
      height: 47px;
      border-bottom: 1px solid #000;
      background-color: lighten($noteBG1, 10%);
      svg {
        height: 100%;
      }
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
        fill: #22b4b4;
      }
    }
    svg {
      fill: #0c2929;
    }
  }
}

.todo {
  margin: 10px 0px 10px 0px;
  display: flex;
  position: relative;
  &__checkbox {
    background-color: transparent;
    margin: 0 5px 0 0;
  }
  &__text {
    flex: 1 0 0;
    background-color: transparent;
    border: 0;
    border-bottom: 1px solid #000;
    @include unusual;
  }
  &__checkbox-label {
    width: 30px;
    height: 30px;
    display: block;
    position: relative;
    cursor: pointer;
    background: $noteBG1 url("../assets/img/icons/process.svg") center/cover
      no-repeat;
    &:hover {
      background-color: lighten($noteBG1, 10%);
    }
  }
  &__delete {
    position: absolute;
    padding: 0px;
    right: 0;
    top: 0;
    width: 25px;
    height: 100%;
    margin: 0;
    background: transparent;
    border: 0;
    svg {
      fill: rgb(78, 74, 74);
    }
    &:hover {
      svg {
        fill: rgb(3, 3, 3);
      }
    }
  }
}
.todo__checkbox-control:checked + .todo__checkbox-label:after {
  content: url("../assets/img/icons/check.svg");
  position: absolute;
  width: 100%;
  height: 100%;
  left: 4px;
  top: 4px;
}
</style>