<template>
  <div class="content-wrapper">
    <loading :active.sync="isLoading" :is-full-page="true" color="#007BFF"></loading>
    <titulo-header>Bandeja de usuarios - Plantaforma de Atención</titulo-header>
    <section class="content">
      <el-row :gutter="10">
        <div class="card menu">
          <el-row :gutter="10">
              <el-col :md="3">
                <label class="col-from-label">Nombre de Usuario</label>
              </el-col>
              <el-col :md="5">
                  <el-input v-model="query.nombres" type="text" 
                  v-on:keyup.enter.native="enter"
                  placeholder="Nombres o Apellidos"/>
              </el-col>
              <el-col :md="3">
                  <label class="col-from-label" >Correo de Usuario</label>
              </el-col>
              <el-col :md="5">
                  <el-input v-model="query.usuario" type="text" 
                  v-on:keyup.enter.native="enter"
                  class="" placeholder="Correo de Usuario"/>
              </el-col>
              <el-col :md="3">
                  <label class="col-from-label" >Nro de documento</label>
              </el-col>
              <el-col :md="5">
                  <el-input v-model="query.documento" type="text" 
                  v-on:keyup.enter.native="enter"
                  class="" placeholder="Número de documento"/>
              </el-col>
          </el-row>
          <el-row :gutter="10" class="d-flex justify-content-end">
              <el-col :md="4">
                  <el-button type="primary" class="btn-block" icon="el-icon-document" @click="excelUsuariosJava">Exportar</el-button>
              </el-col>
              <el-col :md="4">
                  <el-button type="primary" class="btn-block" @click="filtrar">Buscar</el-button>
              </el-col>
              <el-col :md="2">
                <el-tooltip content="Limpiar campos de búsqueda" placement="bottom" effect="light">
                  <el-button type="primary" class="btn-block" icon="el-icon-delete" @click="reseteaForm"></el-button>
                </el-tooltip>
              </el-col>
          </el-row>
        </div>           
        <div class="card menu">
          <table id="example2" title="doble clic para abrir" class="table table-hover table-sm mb-2">
            <thead class="text-nowrap">
            <tr >
              <th width="1%">Nro</th>
              <th width="5%">T. de Documento</th>
              <th>Nro de Documento - Nombre de Usuario</th>
              <th>Representado por</th>
              <th width="3%">Correo de Usuario</th>
              <th class="text-center" width="2%">Fuente</th>
              <th class="text-center" width="2%">Estado</th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="usuario of reporteUsuarios" :key="usuario.registro" @dblclick="verificaPersona(usuario)">
                <td>{{usuario.numRegistro}}</td>
                <td>{{usuario.tipoDocumento}}</td>
                <!-- <td></td> -->
                <td>{{usuario.numeroDocumento}} - {{usuario.nombres}}</td>
                <td>{{usuario.representadoPor}}</td>
                <td>{{usuario.usuario}}</td>
                <td>{{usuario.fuente}}</td>
                <td>{{usuario.estado==0?'PENDIENTE DE ACTIVACION':usuario.estado==1?'ACTIVADO':'INACTIVO'}}</td>
                <!--td class="text-center"><el-button class="" type="text" @click="verificaPersona(usuario)"><u>Ver</u></el-button></!--td>-->
              </tr>
            </tbody>
          </table>
          <div class="d-flex justify-content-center block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="paginaActual"
              :page-sizes="pageOptions"
              :page-size="pageSize"
              :hide-on-single-page="hide_on_single_page"
              layout="prev, pager, next, jumper, sizes, total"
              :total="(reporteUsuarios != null && reporteUsuarios != undefined && reporteUsuarios.length>0) ? reporteUsuarios[0].totalRegistros: 0">
            </el-pagination>
          </div>

          <!--<paginator 
          @pagina="seleccionaPagina($event)"
          :paginaActual="paginaActual"
          :totalPaginas="totalPaginas">
          </paginator>-->

        </div>
      </el-row>
    </section>

      <!-- RESERVADO PARA VENTANAS MODALES -->
      <!-- <sweet-modal ref="asociados" 
       title="Contribuyentes asociados" overlay-theme="dark">
        <div class="container">
          <div class="row pt-2 pb-2 fila-asociado" style="background:#CCC;">
            <div class="col-md-1">TDI</div>
            <div class="col-md-2">CON</div>
            <div class="col-md-7">NOMBRES</div>
            <div class="col-md-2">&nbsp;</div>
          </div>
          <div class="row pt-2 pb-2 fila-asociado"
          v-for="asociado of contribuyentesAsociados" :key="asociado.id">
            <div class="col-md-1">{{asociado.tdi}}</div>
            <div class="col-md-2">{{asociado.con}}</div>
            <div class="col-md-7">{{asociado.razonSocial}}</div>
            <div class="col-md-2 text-right">
              <button class="btn btn-danger btn-sm" @click="lanzaAsociado(asociado)">
              <b-icon-chevron-right></b-icon-chevron-right></button>
            </div>
          </div>
        </div>
      </sweet-modal> -->
  </div>
</template>
<script>
import TituloHeader from '../comun/TituloHeader'
import Constantes from '../../store/constantes'
import axios from 'axios';
import Paginator from '../comun/Paginator'
import { SweetModal} from 'sweet-modal-vue'

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
    components:{
        TituloHeader, Paginator, SweetModal, Loading
    },
    data(){
      return {
        query:{
          nombres:"",
          usuario:"",
          documento:""
        },
        reporteUsuarios: null,
        mostrarAsociados: false,
        contribuyentesAsociados: [],
        paginaActual: 1,
        totalPaginas:0,
        usuarioSeleccionado: {},
        isLoading: true,
        pageSize: 10,
        pageOptions: [10, 20, 50, 100],
        hide_on_single_page: true,
      }
    },
    created(){
      if(localStorage.getItem('logueado')=='true'){
        let storage = localStorage.getItem("Busqueda-usuarios-plataforma");
        if(storage!=null){
          let dataLocalStorage = JSON.parse(storage);
          this.query = dataLocalStorage;
        }

        this.generaReporte();
      }else{
        this.$router.push('/auth/login/');
      }
    },
    methods:{
      handleSizeChange(val) {
        console.log(`${val} items per page`);
        this.pageSize = val
        this.generaReporte();
      },
      handleCurrentChange(val) {
        console.log(`current page: ${val}`);
        this.paginaActual = val
        this.generaReporte();
      },
      excelUsuariosJava(){ 
       let nombre = (this.query.nombres != "") ? this.query.nombres: "-"
       let usuario = (this.query.usuario != "") ? this.query.usuario: "-"
       let nroDocumento = (this.query.documento != "") ? this.query.documento: "-"
        const url=Constantes.rutaPersona+'/usuarioptd/excelusuarios/' +nombre+"/" +usuario+"/" +nroDocumento;
       console.log(url);
        window.open(url, '_blank')
      },
      generaReporte(){
        this.isLoading = true;

        let requestReporte = {};
        if(this.query.nombres!=""){
          requestReporte.nombres = this.query.nombres;
        }
        if(this.query.usuario!=""){
          requestReporte.usuario = this.query.usuario;
        }
        if(this.query.documento!=""){
          requestReporte.nroDocumento = this.query.documento;
        }
        requestReporte.registrosPorPagina = this.pageSize

        axios.post(`${Constantes.rutaPersona}/usuarioptd/lista/${this.paginaActual}`,requestReporte)
        .then(response=>{
          this.totalPaginas = response.data.totalPaginas;
          let data = response.data.data;

          this.reporteUsuarios = data;

          this.isLoading = false;

          localStorage.setItem("Busqueda-usuarios-plataforma", JSON.stringify(this.query));
        }).catch(e=>console.log(e))
      },
      filtrar(){
        this.paginaActual = 1;
        this.generaReporte();
      },
      seleccionaPagina(pagina){
        this.paginaActual = pagina;
        this.generaReporte(pagina);
      },
      verificaPersona(persona){
        if(persona.idPersona==0){
          // console.log(persona);
          // axios.get(`${Constantes.rutaPersona}/usuarioptd/asociados/${persona.numeroDocumento}`)
          // .then(response=>{
          //   let data = response.data.data;

          //   if(data.length==1){
              let ruta = "/components/mantenimiento/usuarios-plataforma/antiguo";
              //this.$router.push(`${ruta}/${persona.numeroDocumento}/${persona.usuario}`);
              let routeData = this.$router.resolve({path:`${ruta}/${persona.numeroDocumento}/${persona.usuario}`});
                window.open(routeData.href,'_blank');
          //   }else if(data.length>1){
          //     this.usuarioSeleccionado = persona.usuario;
          //     this.contribuyentesAsociados = data;
          //     this.$refs.asociados.open();
          //   }else{
          //     this.$swal({
          //       customClass: {
          //           container: 'my-swal'
          //       },
          //       icon: 'warning',
          //       title: 'Adventencia',
          //       text: 'El usuario seleccionado no tiene detalles'                 
          //     });
          //   }
          // }).catch(e=>console.log(e))
        }else{
          let ruta = "/components/mantenimiento/usuarios-plataforma/nuevo";
          //this.$router.push(`${ruta}/${persona.idPersona}/${persona.idPersonaRepresenante}`);
          let routeData = this.$router.resolve({path:`${ruta}/${persona.idPersona}/${persona.idPersonaRepresenante}/${persona.idUsuarioPlataforma}`}); 
          /* let routeData = this.$router.resolve({path:`${ruta}/${persona.idPersona}/${persona.idPersonaRepresenante}`}); */
          window.open(routeData.href,'_blank');
        }
      },
      lanzaAsociado(asociado){
        let ruta = "/components/mantenimiento/usuarios-plataforma/antiguo";
        this.$router.push(`${ruta}/${asociado.tdi}/${asociado.con}/${this.usuarioSeleccionado}`);
      },
      enter(){
        this.filtrar();
      },
      reseteaForm(){
        this.query.nombres = "";
        this.query.usuario = "";
        this.query.documento = "";

        this.enter();
      }
    }
}
</script>
<style lang="scss" scoped>
  .el-col {
    margin-top: 15px;
  }
</style>
<style lang="scss">
label{
    font-size:15px;
}
.btn {
    font-size: initial;
    font-size: 1.2em;
}
.btn, .button {
    border-radius: 5px;
}
button.btn.btn-danger.btn-sm{
  font-size: 1em;
}
.sweet-modal .sweet-title > h2{
  line-height: inherit;
}
.fila-asociado{
  .btn{
    font-size: 0.9em !important;
    padding-bottom: 0;
  }
  border-bottom: 1px dashed #7D7D7E;
}
</style>