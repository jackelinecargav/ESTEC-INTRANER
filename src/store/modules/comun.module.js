import axios from "axios";
import Constantes from "../constantes.js";

export default {
  namespaced: true,
  state: {
    listaUnidadesOrganicas: [],
    listaUsuariosAreaActual: [],
    listaUsuariosPorUnidad: [],
    listaTiposDocumento: [],
    listaUnidadesOrganicasReales: [],
    listaEstadosDeDocumentos: []
  },
  mutations: {
    llenarListaUnidades(state, datos) {
      state.listaUnidadesOrganicas = datos;
    },
    llenarUsuariosAreaActual(state, datos) {
      state.listaUsuariosAreaActual = datos;
    },
    llenarTiposDocumento(state, datos) {
      state.listaTiposDocumento = datos;
    },
    llenarUsuariosPorUnidad(state, datos) {
      state.listaUsuariosPorUnidad = datos;
    },
    llenarUnidadesOrganicasReales(state, datos) {
      state.listaUnidadesOrganicasReales = datos;
    },
    llenarEstadosDeDocumentos(state, datos) {
      state.listaEstadosDeDocumentos = datos;
    }
  },
  actions: {
    async obtenerUnidadesOrganicas({commit}) {
      let unidades = []
      await axios.get(Constantes.rutaTramite + "unidadorganica/-")
        .then((response) => {
          let i = 0;
          const datosRespuesta = response.data.data;
          while (i < datosRespuesta.length) {
            let unidadorganica = {};
            unidadorganica.value = datosRespuesta[i].uniorgcod;
            unidadorganica.text = datosRespuesta[i].uniorgnom;
            unidades.push(unidadorganica);
            i++;
          }
        })
        .catch((e) => console.log(e.response));
      commit('llenarListaUnidades', unidades)
    },
    obtenerUsuariosAreaActual({commit}) {
      const ruta = Constantes.rutaActividades + 'acceso/lista-usuario/' + localStorage.getItem('codUnidadLogueado')
      let usuarios = []
      axios.get(ruta)
        .then(response => {
          let i = 0;
          const datosRespuesta = response.data.data;
          while (i < datosRespuesta.length) {
            let usuario = {};
            usuario.value = datosRespuesta[i].ideUsuario;
            usuario.text = datosRespuesta[i].desLoginUser;
            usuarios.push(usuario);
            i++;
          }
        })
        .catch(e => console.log(e.response))
      commit('llenarUsuariosAreaActual', usuarios);
    },
    async obtenerUsuariosPorUnidad({commit}, unidadId) {
      if (!unidadId || unidadId === 0) return;
      const url = Constantes.rutaTramite + 'usuarios-unidad';
      let usuarios = [];
      await axios.get(url, {params: {'unidadId': unidadId}})
        .then(response => {
          usuarios = response.data;
        })
        .catch((e) => console.log(e.response))
      commit('llenarUsuariosPorUnidad', usuarios);
    },
    async obtenerTiposDocumento({commit}) {
      let datos = [];
      await axios.get(Constantes.ruta + 'ctlmelecgo/135/0')
        .then((response) => {
          datos = response.data.data;
        })
        .catch((e) => console.log(e.response));
      commit('llenarTiposDocumento', datos);
    },
    async obtenerUnidadesOrganicasReales({commit, dispatch, state}) {
      await dispatch('obtenerUnidadesOrganicas');
      const unidadesOrganicas = state.listaUnidadesOrganicas;
      const unidadesOrganicasReales = unidadesOrganicas.filter(function (unidad) {
        return unidad.value !== '0';
      });
      commit('llenarUnidadesOrganicasReales', unidadesOrganicasReales);
    },
    async obtenerEstadosDeDocumentos({commit}) {
      let datos = [];
      await axios.get(Constantes.rutaTramite + 'parametro/24/0')
        .then(response => {
          datos = response.data.data
        }).catch(e => console.log(e.response))
      commit('llenarEstadosDeDocumentos', datos);
    }
  }
}
