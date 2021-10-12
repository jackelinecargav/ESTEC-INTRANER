<template>
  <div id="app">
    <auth-layout v-if="isAuth"></auth-layout>
    <div class="admin-container" v-else>
      <Sidebar :navItems="nav" :listaOpciones="listaOpciones"/>
      <div id="right-panel" class="right-panel">
        <!-- <Header/> -->
        <div class="content pb-0">
          <transition enter-active-class="animated fadeIn">
            <router-view :listaOpciones="listaOpciones" @setIdUser="setIdUser"></router-view>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import nav from "./nav";
  import Header from "./components/Header.vue";
  import Sidebar from "./components/Sidebar.vue";
  import AuthLayout from "./layouts/AuthLayout.vue";
  import axios from "axios";
  import Constantes from "./store/constantes";
  import TituloAzul from "./components/comun/TituloHeader.vue";
  // Vue.component('my-component-name', {  })

  export default {
    data() {
      return {
        idUser: null,
        nav: nav.items,
        listaDePermiso: null,
        listaOpciones: [],
      };
    },
    components: {
      AuthLayout,
      Header,
      Sidebar,
      TituloAzul,
    },
    created() {
      console.log('idusuariologueado'+ localStorage.getItem("idUsuarioLogueado"))
      if (localStorage.getItem("idUsuarioLogueado")) {
        this.idUser = localStorage.getItem("idUsuarioLogueado");
        console.log('idusuaroilogueado2' + this.idUser)
        this.opcionesMenu();
      }
    },
    computed: {
      name() {
        return this.$route.name;
      },
      list() {
        return this.$route.matched;
      },
      isAuth() {
        return this.$route.path.match("auth");
      },
    },
    methods: {
      setIdUser(val) {
        this.idUser = val;
        this.opcionesMenu();
      },
      opcionesMenu() {
        var url = Constantes.rutaAccesos + "menu/obtenermenu/" + this.idUser;
        //localStorage.getItem("idUsuarioLogueado");
        axios
          .get(url)
          .then((response) => {
            this.listaDePermiso = response.data.data;
            var array = [];
            for (var lista1 of this.listaDePermiso) {
              var objeto = new Object();
              objeto.name = lista1.submodulo.nombreSubModulo;
              objeto.icon = "fa fa-puzzle-piece";
              var arrayChildnuevo = [];
              var arrayService = lista1.listaOpcion;
              for (var i = 0; i < arrayService.length; i++) {
                var obj = new Object();
                obj.idOpcion = arrayService[i].idOpcion;
                obj.name = arrayService[i].nombreOpcion;
                obj.url = arrayService[i].ruta;
                obj.icon = "fa fa-puzzle-piece";
                arrayChildnuevo.push(obj);
              }
              objeto.children = arrayChildnuevo;
              array.push(objeto);
            }
            var objCerrar = new Object();
            objCerrar.name = "Cerrar Sesión";
            objCerrar.url = "/auth/login";
            objCerrar.icon = "fa fa-puzzle-piece";
            array.push(objCerrar);
            this.listaOpciones = array;
          })
          .catch((e) => console.log(e));
      },
    },
  };
</script>

<style lang="scss">
  @import url("./assets/css/font-awesome.min.css");
  @import url("./assets/css/themify-icons.css");
  @import url("./assets/css/pe-icon-7-filled.css");
  @import url("./assets/css/flag-icon.min.css");
  @import url("./assets/css/cs-skin-elastic.css");

  @import "./assets/scss/style";
  @import "./assets/scss/style_tabla";

  button {
    cursor: pointer;
  }

  .el-row {
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .el-col {
    padding-right: 15px;
    padding-left: 15px;
  }
</style>
