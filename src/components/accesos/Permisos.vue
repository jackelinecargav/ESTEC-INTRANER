<template>
  <div class="content-wrapper">
    <loading :active.sync="isLoading" :is-full-page="true" color="#007BFF"></loading>
    <titulo-header>Bandeja de Permisos</titulo-header>
    <section class="content">
      <el-row :gutter="10">
        <div class="card menu">
          <el-row :gutter="10" class="d-flex">
            <el-col class="text-right" :xs="24" :md="4">
              <label class="col-form-label">Rol</label>
            </el-col>
            <el-col :xs="24" :md="8">
              <el-select v-model="rolSelect" @change="ListaModulos()" filterable placeholder="Seleccione un rol">
                <el-option
                  v-for="roles of listaRol"
                  :key=roles.idRol
                  :label="roles.nombreRol"
                  :value="roles.idRol">
                </el-option>
              </el-select>
            </el-col>
            <el-col class="ml-auto" :xs="24" :md="4">
              <el-button class="btn-block" v-bind:style="{display: estiloDisplayAdministrado}"  type="primary" @click="estiloDisplayAdministrado='none';isLoading=true; guardarCambios()" >Guardar</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="card menu">
          <template v-if="listaModulos!= null && listaModulos!=undefined && listaModulos.length>0">
            <el-tabs :md="12" type="border-card" @tab-click="preventGetListaSubModulos">
              <el-tab-pane v-for="modulos of listaModulos" :key="modulos.idModulo" :label="modulos.nombreModulo">
                <div class="el-cuerpo__tab">
                  <template v-if="listaSubModulos!= null && listaSubModulos!=undefined && listaSubModulos.length>0">
                    <el-tabs type="card" tab-position="left" @tab-click="preventGetListaOpciones">
                      <el-tab-pane v-for="submod in listaSubModulos" :key="submod.idSubmodulo" :label="submod.nombreSubModulo" style="min-width: 300px">
                        <table class="table table-responsive table-hover table-sm mb-0 ">
                          <thead >
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
                              <td class="text-center" v-for="permiso of opciones.listaPermiso" :key=permiso.accionSistemaTabla>
                                <input id="" type="checkbox" value="true" v-model="permiso.checkbox">
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </el-tab-pane>
                    </el-tabs>
                  </template>
                  <template v-else>
                    <div class="text-center text-muted">
                      No se pudo cargar correctamente la Informacion<br>
                      comunicarse con la <b>Gerencia de Sistemas</b> disculpe las molestias... .
                    </div>
                  </template>
                </div>
              </el-tab-pane>
            </el-tabs>
          </template>
          <template v-else>
            <div class="text-center text-muted">
              No se pudo cargar correctamente la Informacion<br>
              comunicarse con la <b>Gerencia de Sistemas</b> disculpe las molestias... .
            </div>
          </template>
        </div>
      </el-row> 
    </section>
  </div>
</template>
<script>
import TituloHeader from '../comun/TituloHeader'
import { es } from "vuejs-datepicker/dist/locale";
import axios from "axios";
import Datepicker from "vuejs-datepicker";
import Constantes from "../../store/constantes.js";
import VModal from "vue-js-modal";
import moment from "moment";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
export default {
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
      listaOpcionesModelo: null,
      rolSelect: 1,
      estiloDisplayAdministrado:'',
      //VARIABLE PARA BOTON ATENDER
      codUnidadCitas: localStorage.getItem("codUnidadCitas"),
      areaSesion: localStorage.getItem("desUnidadLogueado"),
      usuSesion: localStorage.getItem("cuenta"),
      uniSesion: localStorage.getItem("codUnidadLogueado"),
      isLoading: true,
    };
  },
  mounted() {
      if (localStorage.getItem("logueado") == "true") {
          console.log("está logueado");
      console.log(localStorage);
      this.ListarRol();
      
    } else {
        this.$router.push("/auth/login/");
    }
  },
  components: {
    TituloHeader,
    Loading,
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
      }).catch(e=>{this.AlertClose('error','Error en el servicio','...');})        
    },
    ListaModulos(){
      console.log("<--------------------------------------GET LISTA MODULOS---------------------------------------------------->");
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
          this.estiloDisplayAdministrado='';
      }).catch(e=>{this.AlertClose('error','Error en el servicio','...');})   
    },
    preventGetListaSubModulos(tab){
      this.getListaSubModulos(tab.$vnode.key);
    },
    getListaSubModulos(modulo){
      // let modulo= tab
      console.log("<--------------------------------------GET LISTA SUBMODULOS---------------------------------------------------->");
      console.log(modulo);
      var url=Constantes.rutaAccesos+'rol/submodulos/'+modulo;
      this.modulo = modulo
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
    preventGetListaOpciones(tab){
      this.getListaOpciones(tab.$vnode.key, this.rolSelect);
    },
    getListaOpciones(submodulo, rolSelect){
      console.log("<===========================================GET LISTA OPCIONES=============================================================>");
      var url=Constantes.rutaAccesos+'rol/opciones/'+submodulo+"/"+this.rolSelect;
      this.submodulo = submodulo
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
            for(var j of i.listaPermisos){
              var objeto = new Object()

              objeto.accionSistemaTabla = a;
              objeto.estado             = j.estado;
              objeto.id73AccionSistema  = j.id73AccionSistema;
              objeto.idPermiso          = j.idPermiso;

              if(j.estado != 0){
                objeto["checkbox"] = true;
              }else if(j.estado == 0){
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
          this.isLoading=false;
      }).catch(e=>console.log(e))   
    },
    getListaPermisos(opcion,rol,id73AccionSistema){
      console.log("<===========================================GET LISTA PERMISOS=============================================================>");
      var url=Constantes.rutaAccesos+'rol/getpermisos/'+opcion+"/"+rol+"/0"//+id73AccionSistema;
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
            // TODO: NUEVO PERMISO
            if(permisoJson.checkbox) objeto.estado = 1 //enviarJson.estado
            else if(!permisoJson.checkbox) objeto.estado = 0 //enviarJson.estado
            switch(permisoJson.accionSistemaTabla){
              case 1: objeto.id73AccionSistema = 1; break;  //LECTURA
              case 2: objeto.id73AccionSistema = 2; break;  //REGISTRO
              case 3: objeto.id73AccionSistema = 3; break;  //ESCRITURA
              case 4: objeto.id73AccionSistema = 4; break;  //ESITAR
            }
            if(permisoJson.checkbox) arrayNuevo.push(objeto)
          }

        }
      }

      // console.log("arrayNuevo")
      // console.log(arrayNuevo)
      // console.log("arrayUpdate")
      // console.log(arrayUpdate)
      this.updatePermisos(arrayUpdate)
      this.insertPermisos(arrayNuevo)
    },
    updatePermisos(arrayUpdate){
      var dataPost = new FormData();
      dataPost.append("updatePermisos", JSON.stringify(arrayUpdate));

      var url = Constantes.rutaAccesos+"rol/guardarpermisos"

      axios.post(url, dataPost).then((response) => {
        var respuesta = response.ok;

        console.log("respuesta update");
        console.log(respuesta);
        this.AlertClose('success','Registro Exitoso','...');
      });
    },
    insertPermisos(arrayNuevo){
      var adjuntoPost = {};
      adjuntoPost.nombreMetodo = "insert Permiso";
      adjuntoPost.data = arrayNuevo;
      console.log(arrayNuevo)

      var dataPost = new FormData();
      dataPost.append("insertPermisos", JSON.stringify(arrayNuevo));

      var url = Constantes.rutaAccesos+"rol/nuevopermiso"

      axios.post(url, dataPost).then((response) => {
        var respuesta = response.ok;

        console.log("respuesta insert");
        console.log(respuesta);
      });
    },
    Alerta(icon, title, text){
      this.isLoading=false;
      this.$swal({
        customClass: {
          container: 'my-swal'
        },
        icon: icon,
        title: title,
        text: text                
      });
    },
    AlertClose(icon, title, text){
      this.isLoading=false;
      this.$swal({
          title: title,
          text: text,
          icon: icon,
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: 'No',
          confirmButtonText: 'Ok',
          customClass: {
            container: 'my-swal'
          },
        }).then((result) => {
          this.getListaOpciones(this.submodulo);
          this.estiloDisplayAdministrado='';
          if (result.value) {
            //TODO: AQUI SE PONE LO QUE SE VA EJECUTAR DENTRO DEL BOTON OK
          }
        });
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
<style lang="scss">
  .el-cuerpo__tab{
    .el-tabs__nav{
      min-width: 250px;
      max-width: 350px;
      overflow-wrap: break-word;
    }
    .el-tabs__item{ 
      max-width: 300%;
    }
  }
</style>
<style lang="scss" scoped>
  .table {
    min-width: 50vw;
    overflow-x: scroll;
  }
</style>
