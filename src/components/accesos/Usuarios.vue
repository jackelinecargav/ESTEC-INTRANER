<template>
  <div class="content-wrapper">
    <loading :active.sync="isLoading" :is-full-page="true" color="#007BFF"></loading>
    <titulo-header>Bandeja de Usuarios</titulo-header>
    <section class="content">
      <el-row :gutter="10">
        <div class="card menu">
          <el-row :gutter="10">
            <el-col :xs="8" :md="4" ><div class="grid-content ">
              <label class="col-11 col-form-label font" style="margin: auto">Usuario:</label></div>
            </el-col>
            <el-col :xs="4" :md="8"><div class="grid-content ">
              <el-input placeholder="Ingrese Correo" @input="ListarUsuarios()" @keyup.native.enter="listaUsuariosprevent()" v-model="usuarioBuscar" clearable></el-input></div>
            </el-col>
            <el-col :xs="24" :md="8"/>
            <el-col :xs="24" :md="4">
                <template>
                  <el-button type="primary" class="btn-block" @click="listaUsuariosprevent()">Buscar</el-button>
                </template>
            </el-col>
          </el-row>
        </div> 

        <div class="card menu">
          <table class="table table-hover table-sm mb-2" show-empty>
            <thead class="">
              <tr>
                <th >Usuario</th>
                <th class="text-center" >Nro. Roles</th>
                <th class="text-center">Ver</th>
              </tr>
            </thead>
            <tbody class="font punteroMano " >
              <template v-if="listaUsuarios!=null && listaUsuarios!=undefined && listaUsuarios.length>0">
                <tr v-for="user of listaUsuarios" :key=user.posicion v-on:click="AbrirModal(user.listaRolUser, user.ideUsuario, user.desLoginUser);">
                  <td>{{user.desLoginUser}}</td>
                  <td class="text-center" >{{user.cantidadRoles}}</td>
                  <td class="text-center">
                    <el-button v-on:click="AbrirModal(user.listaRolUser, user.ideUsuario, user.desLoginUser);"  
                    class="" style="font-size: 12px" type="text"><u>Ver Roles</u></el-button>
                  </td>
                </tr>
              </template>
              <template v-else>
                <div class="d-flex justify-content-md-center">
                  <label colspan="3" class="text-muted">Sin Resultados</label>
                </div>
              </template>
            </tbody>
          </table>
          <div class="d-flex justify-content-center block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="indice"
              :page-sizes="pageOptions"
              :page-size="pageSize"
              :hide-on-single-page="hide_on_single_page"
              layout="prev, pager, next, jumper, sizes, total"
              :total="(listaUsuarios != null && listaUsuarios != undefined && listaUsuarios.length>0) ? listaUsuarios[0].totalRegistros: 0">
            </el-pagination>
          </div>
        </div>
      </el-row>
    </section>
    <section>
      <template v-if="showModal">
        <el-dialog class="el-dialog__usuarios" :title="'LISTA DE ROLES'" :visible.sync="showModal" >
          <template>
            <el-row :gutter="10" class="px-3">
              <el-row :gutter="10">
                <el-col :md="7">
                <label for="nomText" class="col-form-label font" style="padding-left: 0px; margin: auto; !important">Usuario Seleccionado: </label>                    
                </el-col>
                <el-col :md="17">
                  <el-input id="nomText" disabled v-model="usuarioSeleccionado"/>
                </el-col>
              </el-row>
              <div class="d-flex justify-content-md-center my-2">
                <table id="example2" class="table table-hover table-sm mb-1">
                  <thead class="">
                  <tr >
                    <th >Nombre de Rol</th>
                    <th class="text-center" >Estado</th>
                  </tr>
                  </thead>
                  <tbody class="">
                    <tr  v-for="rol of listaRolUsuario" :key=rol.posicion>
                      <td class="font" v-if="rol.estado>0">{{rol.nombreRol}}</td>
                      <td class="text-center punteroImpedido" v-if="rol.estado>0">
                        <input class="divdisabled" id=""  type="checkbox" value="true" v-model="rol.checkbox">
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </el-row>
          </template>
          <span slot="footer" class="dialog-footer">
            <el-button @click="botonCancelarModal">Cerrar</el-button>
            <el-button type="primary" @click="abrirModalEdit" >Editar</el-button>
          </span>
        </el-dialog>
      </template>
    </section>
    <section>
      <template v-if="showEdit">
        <el-dialog class="el-dialog__usuarios" :title="'Modificar Rol de Usuario'" :visible.sync="showEdit" append-to-body>
          <template>
          <el-row :gutter="10" class="px-3">
            <el-row :gutter="10">
              <el-col :md="7">
              <label for="nomText" class="col-form-label font">Usuario Seleccionado: </label>                    
              </el-col>
              <el-col :md="17">
                <el-input id="nomText" disabled v-model="usuarioSeleccionado"/>
              </el-col>
            </el-row>                                   
            <div class="d-flex justify-content-md-center my-2 scrollyy">
              <table id="example2" class="table table-hover table-sm mb-0">
                <thead class="">
                  <tr >
                    <th >Nombre de Rol</th>
                    <th class="text-center" >Estado</th>
                  </tr>
                </thead>
                <tbody class="punteroMano">
                  <tr  v-for="rol of listaRolUsuario" :key=rol.posicion v-on:click="rol.checkbox=cambiarEstado(rol.checkbox)">
                    <td class="font">{{rol.nombreRol}}</td>
                    <td class="text-center" >
                      <input id="" type="checkbox" value="true" v-model="rol.checkbox">
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </el-row>
          </template>
          <span slot="footer" class="dialog-footer">
            <el-button @click="showEdit=false">Cerrar</el-button>
            <el-button type="primary" @click="showInter=true" >Guardar</el-button>
          </span>
          <template v-if="showInter">
            <el-dialog width="40%" title="Confirmar operación" :visible.sync="showInter" append-to-body>
              <span slot="footer" class="dialog-footer">
                <el-button @click="showInter=false;">Cerrar</el-button>
                <el-button type="primary" v-bind:style="{display: estiloDisplayAdministrado}"
                v-on:click="estiloDisplayAdministrado='none'; guardarCambiosEdit(); showInter=false; showModal=false">Confirmar</el-button>
              </span>
            </el-dialog>
          </template>
        </el-dialog>
      </template>
    </section>
  </div>
</template>

<script>
import TituloHeader from '../comun/TituloHeader'
import axios from 'axios';
import Datepicker from 'vuejs-datepicker';
import Constantes from '../../store/constantes.js';
import VModal from 'vue-js-modal'
import moment from "moment";

import Paginator from '../comun/Paginator'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
export default {
  components: {
    TituloHeader,
    Paginator,
    Loading,
    VModal
  },
  data(){
    return{
      hide_on_single_page: true,
      estiloDisplayAdministrado: '',
      listaRol:null,
      listaUsuarios:null,
      listaRolUsuario: null,
      listaRespaldo: null,
      usuarioSeleccionado: '',
      idRol: '',
      nombreRol: '',

      rolSelect: 0,
      usuarioBuscar: "",
      indice: 1,
      pageSize: 10,
      pageOptions: [10, 20, 50, 100],

      listaPaginas:null,
      cantidadPaginasBandeja:0,
      date: new Date,
      showModal:  false,
      showEdit:   false,
      showInter: false,
      showModal2:  false,
      showEdit2:   false,
      //VARIABLE PARA BOTON ATENDER
      codUnidadCitas:localStorage.getItem('codUnidadCitas'),
      areaSesion:localStorage.getItem('desUnidadLogueado'),
      usuSesion:localStorage.getItem('cuenta'),
      uniSesion:localStorage.getItem('codUnidadLogueado'),
      //VARIABLES PARA CALENDARIO
      isLoading: true,
    }
  },
  mounted(){
    if(localStorage.getItem('logueado')=='true'){
      console.log('está logueado');
      console.log(localStorage);
       this.ListarRol();
    }else{
      this.$router.push('/auth/login/');
    }
  },
  methods:{
    handleSizeChange(val) {
      console.log(`${val} items per page`);
      this.pageSize = val
      this.listaUsuariosprevent();
    },
    handleCurrentChange(val) {
      console.log(`current page: ${val}`);
      this.indice = val
      this.listaUsuariosprevent();
    },
    cambiarEstado(element){
      if(element)element=false
      else element=true
      return element
    },
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
          this.isLoading=false
          this.listaRol = neoJson
          console.log(this.listaRol)
        }).catch(
          e=>console.log(e),
          e=>this.Alerta('error','Error al cargar Horarios','Comuniquese con GSTI')
        )        
    },
    listaUsuariosprevent(){
      this.isLoading = true;
      this.ListarUsuarios()
    },
    ListarUsuarios(){
      if(this.usuarioBuscar=="" || this.usuarioBuscar=="?"||this.usuarioBuscar=="%") return;
      let objeto = {}
      objeto.correo = this.usuarioBuscar.toUpperCase();
      objeto.rolSelect= this.rolSelect
      objeto.indice = this.indice
      objeto.limite=this.pageSize
      var url=Constantes.rutaAccesos+'usuario/obtusuariorol'
      
      console.log("url usuarios");
      console.log(url, objeto);
      axios.post(url, objeto).then(response=>{
          console.log("LISTA DE ROL");
          this.listaUsuarios=response.data.data;
          console.log(this.listaUsuarios)
          this.isLoading=false
      }).catch(
        e=>console.log(e),
        e=>this.Alerta('error','Error al buscar Usuarios','Comuniquese con GSTI')
      )
    },
    guardarCambiosEdit(){
      var arrayNuevo  = [];
      var arrayUpdate = [];
      for(var enviarJson of this.listaRolUsuario){
        
        var objeto = new Object()
        objeto.idRol      = enviarJson.idRol
        objeto.idUsuario  = enviarJson.ideUsuario
          
        if(enviarJson.idRoluser != 0){
          // TODO: UPDATE ROL USUARIO
          objeto.idRolUser  = enviarJson.idRoluser
          if(enviarJson.checkbox) objeto.estado = 1 //enviarJson.estado
          else if(!enviarJson.checkbox) objeto.estado = 0 //enviarJson.estado

          arrayUpdate.push(objeto)

        }else if(enviarJson.idRoluser == 0){
          // TODO: NUEVO ROL USUARIO
          if(enviarJson.checkbox) objeto.estado = 1 //enviarJson.estado
          else if(!enviarJson.checkbox) objeto.estado = 0 //enviarJson.estado

          if(enviarJson.checkbox) arrayNuevo.push(objeto)
        }
      }
      console.log("arrayNuevo")
      console.log(arrayNuevo)
      console.log("arrayUpdate")
      console.log(arrayUpdate)
      this.updateRolusuario(arrayUpdate)
      this.insertRolusuario(arrayNuevo)
      this.listaUsuariosprevent()
    },
    updateRolusuario(arrayUpdate){
      var url = Constantes.rutaAccesos+'roluser/updateroluser'

      axios.post(url, arrayUpdate).then((response) => {
        var respuesta = response.data.success;
        if(respuesta){
          // this.Alerta('success','Registro Exitoso','')

          this.showEdit=false;
          this.AlertClose('success','Registro Exitoso','');
        }else this.Alerta('error','Error al actualizar rol usuario','Comuniquese con GSTI')
      }).catch(
        e=>console.log(e),
        e=>this.Alerta('error','Error al actualizar rol usuario','Comuniquese con GSTI'),
      );
    },
    insertRolusuario(arrayNuevo){
      if(arrayNuevo.length==0)return;
      var url = Constantes.rutaAccesos+'roluser/createroluser'

      axios.post(url, arrayNuevo).then((response) => {
        var respuesta = response.data.success;
        if(!respuesta)this.Alerta('error','Error al asignar rol usuario','Comuniquese con GSTI')
      }).catch(
        e=>console.log(e),
        e=>this.Alerta('error','Error al asignar rol usuario','Comuniquese con GSTI')
      );
    },
    botonConfirmarOperacion(){
      this.showModal=false ; 
    },
    botonCancelarModal(){
      this.showModal=false ;
    },
    abrirModalEdit(){
      this.showEdit = true;
    },
    cancelarEditModal(){
      this.listaRolUsuario = this.listaRespaldo
    },
    AbrirModal(listaRol, ideUsuario, correoUsuario){
      this.showModal = true
      this.usuarioSeleccionado = correoUsuario
      var array = []
      var a = 1;
      for(var list of listaRol){
        var obj = new Object()
        obj.posicion  = a
        obj.nombreRol = list.rol.nombreRol
        obj.idRol     = list.rol.idRol
        if(list.idRoluser>0 && list.estado > 0 )obj.checkbox = true
        else obj.checkbox = false
        obj.estado = list.estado
        obj.idRoluser = list.idRoluser
        obj.ideUsuario = ideUsuario
        array.push(obj)
        a++
      }
      this.listaRespaldo = array
      this.listaRolUsuario = array
    },
    reemplazaVacio(cadena){
      return cadena==''?'-':cadena;
    },
    reemplazaVacioEntero(cadena){
      return cadena==''?'0':cadena;
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
          customClass: {
            container: 'my-swal'
          },
          title: title,
          text: text,
          icon: icon,
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: 'No',
          confirmButtonText: 'Ok',
        }).then((result) => {
          this.estiloDisplayAdministrado='';
          if (result.value) {
          }
        });

    }

  },
  filters:{
    pintaPuntos(pagina){
      if(pagina==-1){
        return '...';
      }
      else{
        return pagina;
      }
    }
  }
}
</script>
<style lang="scss">
  .el-dialog__usuarios {
    .el-dialog__body {
      padding-top: 10px;
    }
  }
</style>
<style lang="scss" scoped>
  .el-dialog {
    label{
      font-size: 12px;
    }
    .form-control {
      font-size: 12px;
    }
  }
  .el-col {
    margin-top: 15px;
  }
  .punteroMano{
    cursor: pointer
  }
  .punteroImpedido{
    cursor: not-allowed !important;
  }
  .scrollyy{
    max-height: 40vh;
	  overflow-y: scroll;
  }
  .modalConte{
    padding: 0px;
    width: 50vw;
    max-height: 70vh;
    background: white;
    top: 15%;
    left: 25%;
    box-shadow: 0px 0px 50px black;
    border-radius: 30px 0px 30px 0px;
    position: absolute;
    margin: auto auto;
  }
  .modalCabecera{
    background: #006699;
    margin: 0px;
    border-radius: 30px 0px 0px 0px;
    padding: 10px
  }
  .divdisabled {
    pointer-events: none;
    opacity: 0.9;
    cursor: not-allowed !important;
  }
  .font{
    font-size: 13px;
  }
  .paddinghorizontal{
    padding-left: 0px;
    padding-right: 0px;
  }
  .contenedor {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: rgba(0, 0, 0, .5);
    transition: opacity .3s ease;
    z-index: 9998;
  }
  .interbody{
    padding: 10px;
    width: 300px;
    background: white;
    top: 50%;
    left: 45%;
    box-shadow: 0px 0px 10px black;
    position: absolute;
  }
  h3{
    text-align: center;
    color:white;
  }
  .clear{
    clear: both;
  }

  .my-swal {
    display: -webkit-box;
    display: flex;
    position: fixed;
    z-index: 300000;
  }
</style>
