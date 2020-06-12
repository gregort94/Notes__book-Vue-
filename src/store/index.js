import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import { router } from '../routes'
export const store = new Vuex.Store({
   state: {
      deletingNote: false,
      notesData: [
         {
            title: 'Go shopping',
            id: 0,
            todos: [
               {
                  text: 'onion',
                  done: true
               },
               {
                  text: 'potato',
                  done: false
               },
               {
                  text: 'milk',
                  done: false
               },
               {
                  text: 'cheese',
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
      addNote(state, note) {
         state.notesData.unshift(note);
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
   },
   actions: {
      removeNoteHandler(store) {
         store.commit("removeNote");
         store.commit('localStorageSync');
         if (router.currentRoute.fullPath === '/notes') {
            return
         }
         router.push('/notes')
      },
      addNoteHandler(store) {
         let id;
         if (store.getters.notesData.length === 0) {
            id = 0;
         } else {
            let maxId = 0;
            store.getters.notesData.forEach(note => {
               if (note.id > maxId) {
                  maxId = note.id;
               }
            });
            id = maxId + 1;
         }
         const newNote = { id: id, title: "", todos: [] };
         store.commit('addNote', newNote);
         store.commit('localStorageSync');
         router.push(`/notes/${id}`)
      }
   }
})