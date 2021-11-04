<template>
  <div class="content-wrapper">
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-10">
            <div class="row">
              <h4>
                <b>Bandeja de Roles</b>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="content">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header mb-0">
              <div class="row">
                <div class="form-group col-sm-5">
                  <div class="row">
                    <label
                      for="exampleInputPassword1"
                      class="col-sm-3 col-form-label"
                      style="padding-right: 0px; !important"
                    >Rol</label>
                    <div class="col-sm-5">
                      <div class="form-group">
                        <select id="estAtencion" class="form-control" v-model="rolSelect" @change="ListaModulos()">
                          <!-- <option value="0">Todos</option> -->
                          <option v-for="roles of listaRol" :key=roles.idRol :value="roles.idRol" >{{roles.nombreRol}}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-1">
                  <button type="button"  class="btn btn-primary" @click="guardarCambios()">Guardar</button>
                </div>
              </div>
                <div style="background-color: white">
                    <b-card no-body >
                    <b-tabs   content-class="mt-3" style="padding: 10px"> 
                        <!-- Render Tabs, supply a unique `key` to each tab -->
                        <b-tab v-for="modulos of listaModulos" :key="'dyn-tab-' + modulos.idModulo" :title="modulos.nombreModulo" v-on:click="getListaSubModulos(modulos.idModulo)" style="padding: 5px">
                        <!-- AQUI SE MUESTRA EL CONTNIDO DE {{ modulos.nombreModulo }} -->
                        <div  style="background-color: blue"> 
                            <b-card  no-body > 
                                <b-tabs  píldoras  tarjeta  vertical  nav-wrapper-class="w-50" > 
                                <b-tab  v-for="submod in listaSubModulos" :key="'don-tab-' + submod.idSubmodulo" :title=" submod.nombreSubModulo" v-on:click="getListaOpciones(submod.idSubmodulo, rolSelect)" >
                                    <!-- <b-card-text > AQUI SE MUESTRA EL CONTNIDO VERTICAL DE {{ submod.nombreSubModulo }}</b-card-text >  -->
                                    <table id="example2" class="table table-bordered table-hover table-sm mb-0 ">
                                        <thead class="btn-primary">
                                        <tr >
                                        <th width="5%" >Código</th>
                                        <th width="5%" class="text-center">Lectura</th>
                                        <th width="8%" class="text-center">Registro</th>
                                        <th width="6%" class="text-center">Especial</th>
                                        <th width="6%" class="text-center">Supervisor</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="opciones of listaOpcionesModelo" :key=opciones.idOpcion >
                                            <td>{{opciones.nombreOpcion}}</td>
                                            <td class="text-center" v-for="permiso of opciones.listaPermiso" :key=permiso.accionSistemaTabla><input id="" type="checkbox" value="true" v-model="permiso.checkbox"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </b-tab > 
                                </b-tabs > 
                            </b-card > 
                        </div >
                        </b-tab>
                        <template v-slot:empty>
                        <div class="text-center text-muted">
                            No se pudo cargar correctamente la Informacion<br>
                            comunicarse con la <b>Gerencia de Sistemas</b> disculpe las molestias... .
                        </div>
                        </template>
                    </b-tabs>
                    </b-card>
                </div>
                
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<style>

.tabs {
    margin-right: .1rem;
    margin-left: .1rem;
}
.card-header-tabs {
    margin-bottom: .1rem;
    
    border-bottom: 0;
}

.nav {
    display: flex;
    flex-wrap: wrap;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;

}
.nav-tabs .nav-link {
    border: 1px solid transparent;
    border-top-left-radius: .25rem;
    border-top-right-radius: .25rem; 
    padding: 30px;
    background-color: whitesmoke;
}

.nav-tabs {
    border-bottom: 1px solid #dee2e6;
    padding: 10px; 
}
√.nav-link {
    display: block; 
    padding: .5rem 1rem;
}
.small, small {
    font-size: 80%;
    font-weight: 400;
}
</style>


<script>
// import { mdiEraser } from '@mdi/js';

// import { TabsPlugin } from 'bootstrap-vue'

import { es } from "vuejs-datepicker/dist/locale";
import axios from "axios";
import Datepicker from "vuejs-datepicker";
import Constantes from "../../store/constantes.js";
import VModal from "vue-js-modal";
import moment from "moment";
export default {
    name: "BandejaCitas",
  data() {
      return {
          tabs: ['RRHH', 'CONTABILIDAD'],
      tabCounter: 0,
      tabsVertical: ['RRHH 1', 'RRHH 2', 'RRHH 3', 'RRHH 4'],
      opcionesJson: [
          {'opcion' : 'bandeja cita',
          'lectura' : false,
          'registro' : true,
          'edicion' : false,},
          {'opcion' : 'bandeja Virtual',
          'lectura' : true,
          'registro' :false,
          'edicion' : true,}
      ],
      listaRol: null,
      listaModulos: null,
      listaOpciones: null,
      listaSubModulos: null,
      listaPermisos: null,
      idRol: '',
      nombreRol: '',
      listaOpcionesModelo: null,
      itemEditar: false,
      rolSelect: 1,
      //VARIABLE PARA BOTON ATENDER
      codUnidadCitas: localStorage.getItem("codUnidadCitas"),
      areaSesion: localStorage.getItem("desUnidadLogueado"),
      usuSesion: localStorage.getItem("cuenta"),
      uniSesion: localStorage.getItem("codUnidadLogueado"),
      //VARIABLES PARA CALENDARIO
      fechaDatePicker: new Date(),
      es: es
    };
  },
  mounted() {
      if (localStorage.getItem("logueado") == "true") {
          console.log("está logueado");
      console.log(localStorage);
      this.FechaActual();
      this.ListarRol();
      
    } else {
        this.$router.push("/auth/login/");
    }
  },
  components: {
    // TabsPlugin,
    Datepicker,
    VModal
  },
  methods: {
    ListarRol(){
      var url=Constantes.rutaAccesos+'rol/getRol';
      console.log("url rol");
      console.log(url);
      axios.get(url).then(response=>{
          console.log("LISTA DE ROL");
          this.listaRol=response.data.data;
          var neoJson = []
          var aux=0;
          for(var rol of this.listaRol){
            if(rol.idRol != aux){
              var objetos = new Object();
              objetos.idRol     =rol.idRol;
              objetos.nombreRol =rol.nombreRol;
              neoJson.push(objetos)
            }
            aux = rol.idRol
          }
          this.listaRol = neoJson
          console.log(this.listaRol)
          // this.stringResponsables()
          
          this.ListaModulos();
        })
        .catch(e=>console.log(e))        
    },
    ListaModulos(){
      var url=Constantes.rutaAccesos+'rol/modulos';
      console.log("url modulos");
      console.log(url);
      axios.get(url).then(response=>{
          console.log("LISTA DE MODULOS");
          this.listaModulos=response.data.data;
          var modulo = this.listaModulos[0].idModulo
          this.getListaSubModulos(modulo);
          console.log(modulo)
          console.log(this.listaModulos)
        })
        .catch(e=>console.log(e))   
    },
    getListaSubModulos(modulo){
      console.log("<------------------------------------------------------------------------------------------>");
      var url=Constantes.rutaTramite+'rol/submodulos/'+modulo;
      console.log("url submodulos");
      console.log(url);
      axios.get(url).then(response=>{
          console.log("LISTA DE submodulos");
          this.listaSubModulos=response.data.data;
          var submodulo = this.listaSubModulos[0].idSubmodulo
          console.log(submodulo)
          this.getListaOpciones(submodulo);
          console.log(this.listaSubModulos)
        })
        .catch(e=>console.log(e))   
    },
    getListaOpciones(submodulo, rolSelect){
      console.log("<========================================================================================================>");
      var url=Constantes.rutaTramite+'rol/opciones/'+submodulo+"/"+this.rolSelect;
      console.log("url opciones");
      console.log(url);
      axios.get(url).then(response=>{
          console.log("LISTA DE OPCIONES");
          this.listaOpciones=response.data.data;
          
          var arrays = [];
          for(var i of this.listaOpciones){
            var objetos = new Object()
            objetos.idOpcion      = i.idOpcion;
            objetos.nombreOpcion  = i.nombreOpcion;
            objetos.idRol          = this.rolSelect;
            var array = [];
            var a = 1;
            for(var j of i.listaPermiso){
              var objeto = new Object()

              objeto.accionSistemaTabla = a;
              objeto.estado             = j.estado;
              objeto.id73AccionSistema  = j.id73AccionSistema;
              objeto.idPermiso          = j.idPermiso;

              if(j.idPermiso != 0){
                objeto["checkbox"] = true;
              }else if(j.idPermiso == 0){
                objeto["checkbox"] = false;
              }
              a++;
              array.push(objeto)
            }
            objetos.listaPermiso = array;
            arrays.push(objetos)
          }
          this.listaOpcionesModelo = arrays
          console.log(this.listaOpcionesModelo)
        })
        .catch(e=>console.log(e))   
    },
    getListaPermisos(opcion,rol,id73AccionSistema){
      console.log("<========================================================================================================>");
      var url=Constantes.rutaTramite+'rol/getpermisos/'+opcion+"/"+rol+"/0"//+id73AccionSistema;
      console.log("url permisos  ===>>> " +id73AccionSistema);
      console.log(url);
      axios.get(url).then(response=>{
          console.log("LISTA DE PERMISOS");
          this.listaPermisos=response.data.data;
          
          console.log(this.listaPermisos)
        })
        .catch(e=>console.log(e))   
    },
    guardarCambios(){
      console.log("<========================================================================================================>");
      console.log(this.listaOpcionesModelo)
      var arrayNuevo  = [];
      var arrayUpdate = [];
      for(var enviarJson of this.listaOpcionesModelo){
        
        for(var permisoJson of enviarJson.listaPermiso){
          var objeto = new Object()
          var objetoRol = new Object()
          var objetoOpcion = new Object()
          objetoRol.idRol = enviarJson.idRol
          objetoOpcion.idOpcion = enviarJson.idOpcion

          objeto.modulo = objetoOpcion
          objeto.rol = objetoRol

          if(permisoJson.idPermiso != 0){
            // TODO: UPDATE PERMISO
            objeto.idPermiso = permisoJson.idPermiso
            if(permisoJson.checkbox) objeto.estado = 1 //enviarJson.estado
            else if(!permisoJson.checkbox) objeto.estado = 0 //enviarJson.estado
            switch(permisoJson.accionSistemaTabla){
              case 1: objeto.id73AccionSistema = 1; break;  //LECTURA
              case 2: objeto.id73AccionSistema = 2; break;  //REGISTRO
              case 3: objeto.id73AccionSistema = 3; break;  //ESCRITURA
              case 4: objeto.id73AccionSistema = 4; break;  //ESITAR
            }

            arrayUpdate.push(objeto)

          }else if(permisoJson.idPermiso == 0){
            // TODO: NUEVO PERMSO
            if(permisoJson.checkbox) objeto.estado = 1 //enviarJson.estado
            else if(!permisoJson.checkbox) objeto.estado = 0 //enviarJson.estado
            switch(permisoJson.accionSistemaTabla){
              case 1: objeto.id73AccionSistema = 1; break; //LECTURA
              case 2: objeto.id73AccionSistema = 2; break;  //REGISTRO
              case 3: objeto.id73AccionSistema = 3; break;  //ESCRITURA
              case 4: objeto.id73AccionSistema = 4; break;  //ESITAR
            }
             if(permisoJson.checkbox) arrayNuevo.push(objeto)
          }

        }
      }

      console.log("arrayNuevo")
      console.log(arrayNuevo)
      console.log("arrayUpdate")
      console.log(arrayUpdate)
      this.updatePermisos(arrayUpdate)
      this.insertPermisos(arrayNuevo)
      this.$swal({
                  customClass: {
                    container: 'my-swal'
                  },
                  icon: 'success',
                  title: 'Registro exitoso.',
                  // text: 'Se realizó la operación.'                  
                });

    },
    updatePermisos(arrayUpdate){
      var dataPost = new FormData();
      dataPost.append("updatePermisos", JSON.stringify(arrayUpdate));

      var url = Constantes.rutaTramite+"rol/guardarpermisos"

      axios.post(url, dataPost).then((response) => {
        var respuesta = response.ok;

        console.log("respuesta update");
        console.log(respuesta);
      });
    },
    insertPermisos(arrayNuevo){
      var adjuntoPost = {};
      adjuntoPost.nombreMetodo = "insert Permiso";
      adjuntoPost.data = arrayNuevo;
      console.log(arrayNuevo)

      var dataPost = new FormData();
      dataPost.append("insertPermisos", JSON.stringify(arrayNuevo));

      var url = Constantes.rutaTramite+"rol/nuevopermiso"

      axios.post(url, dataPost).then((response) => {
        var respuesta = response.data.ok;
        console.log("respuesta insert");
        console.log(respuesta);
      });
    },
    closeTab(x) {
        for (let i = 0; i < this.tabs.length; i++) {
        if (this.tabs[i] === x) {
            this.tabs.splice(i, 1)
        }
        }
    },
    newTab() {
        this.tabs.push(this.tabCounter++)
    },
    FechaActual() {
      this.fechaSelEnvio = this.customFormatter(new Date());
      console.log("fecha: " + this.fechaSelEnvio);
    },
    FechaAtencion() {
      var Fec = new Date();
      this.minAten = Fec.getHours;
      console.log(this.minAten);
    },
    CambiarPagina(pagina) {
      if (pagina > 0) {
        this.indice = pagina;
        this.buscarCitasVirtual();
      }
    },
    reemplazaVacio(cadena, reemplazo) {
      return cadena == "" ? "-" : cadena;
    },
    reemplazaVacioEntero(cadena, reemplazo) {
      return cadena == "" ? "0" : cadena;
    },

    botonRefrescar() {
      var fechaHoy = new Date();
      this.fechaDatePicker = fechaHoy;
      this.estadoAtencion = 1;
      this.dniEscribir = "";
      this.getCitasArea(0);
    },

    PadLeft(value, length) {
      return value.toString().length < length
        ? PadLeft("0" + value, length)
        : value;
    },
    //para calendario
    datepickerAbierto: function() {
      console.log("El datepicker ha sido abierto");
    },
    fechaSeleccionada: function() {
      console.log("Una fecha ha sido seleccionada");
      console.log(this.fechaDatePicker);
      this.$nextTick(() => console.log(this.fechaDatePicker));
    },
    datepickerCerrado: function() {
      console.log("El datepicker ha sido cerrado");
      console.log(this.fechaDatePicker);
      console.log(moment(this.fechaDatePicker).format("D/MM/YYYY"));
      var fechaSel = moment(this.fechaDatePicker).format("D/MM/YYYY");
      console.log(fechaSel);
    },
    valorRemovido() {
      console.log("CLEAR");
      this.fechaDatePicker = " ";
    },
    customFormatter(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    customFormatCal(date) {
      return moment(date).format("D MM YYYY");
    },
    fechaFormat(date) {
      return moment(date).format("YYY-MM-DD");
    },
    //para ventana
    show() {
      this.$modal.show("tomarModal");
    },
    hide() {
      this.$modal.hide("tomarModal");
    },
    beforeOpen(event) {
      console.log(event.params.foo);
    }
  },
  filters: {
    pintaPuntos(pagina) {
      if (pagina == -1) {
        return "...";
      } else {
        return pagina;
      }
    }
  }
};
</script>