import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
   state: {
      maxId: false,
      editingNote: false,
      deletingNote: false,
      notesData: [
         {
            title: 'test',
            id: 0,
            todos: [
               {
                  text: 'todotodotodoodotodotodo todotodo',
                  done: true
               },
               {
                  text: 'todo todot odotodotodot odotodotodo',
                  done: false
               },
               {
                  text: 'todo to dotodotodoto otodotodotodo',
                  done: false
               },
            ]
         },

      ],
   },
   getters: {
      notesData(state) {
         return state.notesData
      },
      editingNote(state) {
         return state.editingNote
      },
      deletingNote(state) {
         return state.deletingNote
      }
   },
   mutations: {
      addNote(store) {
         const newNote = { title: "", todos: [] };
         store.notesData.unshift(newNote);
         store.editingNote = newNote;
      },
      removeNote(state) {
         const index = state.notesData.indexOf(state.deletingNote);
         state.notesData.splice(index, 1);
      },
      setEditingNote(state, note) {
         state.editingNote = note;
      },
      setDeletingNote(state, note) {
         state.deletingNote = note;
      },
      closeEdit(state) {
         state.editingNote = false;
      },
      clearDeletingData(state) {
         state.deletingNote = false;
      },
      setDataFromLocalStorage(state) {
         const localStorageData = localStorage.getItem("notesData");
         if (localStorageData) {
            const data = JSON.parse(localStorageData);
            state.notesData = data;
         }
      },
      localStorageSync(state) {
         localStorage.setItem('notesData', JSON.stringify(state.notesData))
      },
      setMaxId(state) {
         let maxId = 0;
         state.notesData.forEach(note => {
            if (note.id > maxId) {
               maxId = note.id;
            }
         });
         state.maxId = maxId;
      }

   },
   actions: {
      removeNoteHandler(store, note) {
         store.commit("removeNote", note);
         store.commit("closeEdit");
         store.commit('localStorageSync');
      },
      addNoteHandler(store) {
         store.commit('addNote');
         store.commit('localStorageSync');
      }
   }
})