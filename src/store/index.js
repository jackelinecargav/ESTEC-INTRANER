import Vue from 'vue';
import Vuex from 'vuex';

import axios from "axios";
import Constantes from "./constantes.js";

import app from './modules/app';
import comun from './modules/comun.module';

import * as getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: false,  // process.env.NODE_ENV !== 'production',
  getters,
  modules: {
    app,
    comun,
  },
  state: {
    restricciones: []
  },
  mutations: {
    llenarRestricciones(state, datos){
      state.restricciones = datos;
    }
  },
  actions:{
    async obtenerRestricciones({commit}){
      const url = Constantes.rutaAccesos + "/restricciones";
      let restricciones = [];
      await axios.get(url)
        .then(response => {
          restricciones = response.data;
        })
        .catch(e => console.log(e))
      commit('llenarRestricciones', restricciones);
    }
  }
})

export default store
