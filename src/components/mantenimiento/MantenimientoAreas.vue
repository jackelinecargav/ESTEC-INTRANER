<template>
  <div class="content-wrapper">
    <loading :active.sync="isLoading" :is-full-page="true" color="#007BFF"></loading>
    <titulo-header>Bandeja de Unidades Orgánicas</titulo-header>
    <section class="content">
      <el-row :gutter="10">
        <div class="card menu">
          <el-row :gutter="10">
            <el-col :md="3">
              <label class="col-from-label">Buscar</label>
            </el-col>
            <el-col :md="6">
              <el-input v-model="filters[0].value" type="search" id="filterInput" placeholder="Nombre de unidad"></el-input>
              <!-- <el-row class="m-0">
                <el-col :md="20" class="m-0">
                </el-col>
                <el-col :md="4" class="m-0">
                  <el-tooltip content="Limpiar campo de búsqueda" placement="bottom" effect="light">
                    <el-button type="primary" :disabled="!filter" class="btn-block"  icon="el-icon-delete" @click="filter = ''"></el-button>
                  </el-tooltip>
                </el-col>
              </el-row> -->
            </el-col>
            <el-col :md="3">
              <label class="col-from-label">Estado</label>
            </el-col>
            <el-col :md="5">
              <el-select v-model="estadoReg" placeholder="Estado">
                <el-option :value="1" label="Activo"></el-option>
                <el-option :value="2" label="Inactivo"></el-option>
              </el-select>
            </el-col>
            <el-col :md="3"/>
            <el-col :md="4">
              <el-button class="btn-block" type="primary" @click="obtenerAreas(estadoReg)">Buscar</el-button>
            </el-col>
          </el-row>
        </div>
      </el-row>
    </section>
    <section>
      <template>
        <div class="card menu mb-3">
          <data-tables-server title="doble click para abrir" @row-dblclick="abririnfo" :data="mapListaAreas" :page-size="pageSize" 
            @query-change="CambiarPagina" :filters="filters" style="cursor: pointer"
            :pagination-props="{ background: true, pageSizes: [10, 20, 50, 100] }" :total="totalRows" >
            <el-table-column v-for="(title, index) in titles" :prop="title.prop" :label="title.label" :key="index" :width="title.size">
              <template v-slot="scope">
                <span v-if="title.label == 'Uni. Orgánica'"><div >{{scope.row.nombreArea}}</div></span>
                <span v-if="title.label == 'Correo de Unidad'"><div >{{scope.row.correoArea}}</div></span>
                <span v-if="title.label == 'Teléfono'" class="text-wrap">{{reemplazarElemento(scope.row.telefonoArea, /[-]/gi,"\n")}}</span>
                <span v-if="title.label == 'Estado'"><div >{{scope.row.estado}}</div></span>
                <span v-if="title.label == 'Correo del Jefe'">{{scope.row.jefeArea}}</span>
                <span v-if="title.label == ' '">
                  <el-button class="mr-1" type="text" @click="info(scope.row , parametrosModal[1])" ><u>Editar</u></el-button>
                </span>
              </template>
            </el-table-column>
          </data-tables-server>
        </div>
      </template>
    </section>
    <!-- <section>
      <template>
        <div class="card menu mb-3">
          <table  class="table table-responsive table-hover table-sm mb-2"  >
            <thead class="text-nowrap">
              <tr>
                <th class=""  width="25%">Uni. Orgánica</th>
                <th class=""  width="25%">Correo de Unidad</th>
                <th class=""  width="10%">Teléfono</th>
                <th class=""  width="5%"> Estado</th>
                <th class=""  width="25%">Correo del Jefe</th>           
                <th class=""  width="5%"></th>           
                <-- <th class=""  width="25%">Correos de Responsables</th> 
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) of mapListaAreas" :key="i" v-on:dblclick="info(item, i, parametrosModal[0])">
                <td ><div >{{item.nombreArea}}</div></td>
                <td ><div >{{item.correoArea}}</div></td>
                <td ><div ><p>{{reemplazarElemento(item.telefonoArea, /[-]/gi,"\n")}}</p></div></td>
                <td ><div >{{item.estado}}</div></td>
                <-- <td ><div style="width: 100%; max-width: 250px; !important">{{item.responsableArea}}</div></td> 
                <td >{{item.jefeArea}}</td>  
                <td >
                  <el-button class="mr-1" type="text" @click="info(item, i, parametrosModal[1])" ><u>Editar</u></el-button>
                </td>
              </tr>
            </tbody>
            <tfoot class="d-flex justify-content-center mt-5">
              <div class="d-flex justify-content-center block">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page.sync="indice"
                  :page-sizes="pageOptions"
                  :page-size="pageSize"
                  layout="prev, pager, next, jumper, sizes, total"
                  :total="totalRows">
                </el-pagination>
              </div>
            </tfoot>
          </table>
        </div>
      </template>
    </section> -->
    <section>
      <template v-if="showModal">
        <el-dialog class="modalToken" :title="infoModal.title" :visible.sync="showModal" :before-close="resetInfoModal">
          <template> 
            <b-container class="sm-10">
              <div class="row sm-8">
                <label class="sm-4" style="">Correo responsables:</label>
                <template v-if="parametroModal==0"><el-input type="textarea" autosize class="" rows="2" :disabled="isDisabled" v-model="responsablesModal"></el-input></template>
                <template v-if="parametroModal==1"><el-input rows="2" :disabled="isDisabled" v-model="responsablesModal"/></template>
                <label style="font-size:10px">* Separar con comas los correos ingresados.</label>
              </div> 
              <div class="row sm-8">
                <label class="sm-4" style="">Correo área:</label>
                <template><el-input :disabled="isDisabled" v-model="correoModal"/></template>
              </div>
              <div class="row sm-8">
                <label class="sm-4" style="">Correo jefe:</label>
                <template><el-input rows="2" :disabled="isDisabled" v-model="correojefeModal"/></template>
                <label style="font-size:10px">* Separar con comas los correos ingresados.</label>
              </div> 
              <div class="row sm-8">
                <label class="sm-4" style="">Teléfono área:</label>
                <template><el-input :disabled="isDisabled" v-model="telefonoModal"/></template>                        
              </div>                        
              <div class="row sm-8" style="padding-top:10px">
                <label class="sm-8" style="padding-right:10px">Estado área:</label>  
                <template>          
                  <el-select class="col-3 col-sm-3" :disabled="isDisabled" v-model="estadoModal" placeholder="Estado">
                    <el-option :value="1" label="Activo"></el-option>
                    <el-option :value="2" label="Inactivo"></el-option>
                  </el-select>
                </template>                               
              </div>
            </b-container>
          </template>
          <span slot="footer" class="dialog-footer">
            <el-button @click="resetInfoModal">Cerrar</el-button>
            <template v-if="parametroModal==1">
              <el-button type="primary" v-bind:style="{display: estiloDisplayAdministrado}" @click="guardarCambios();showModal=false" >Confirmar</el-button>
            </template>
          </span>
          <template v-if="showInter">
            <el-dialog width="30%" title="Confirmar operación" :visible.sync="showInter" append-to-body>
              <span slot="footer" class="dialog-footer">
                <el-button @click="showInter=false">Cerrar</el-button>
                  <el-button type="primary" @click="guardarCambios(); showInter=false; showModal=false; estiloDisplayAdministrado='none';" >
                    Confirmar</el-button>
              </span>
            </el-dialog>
          </template>
        </el-dialog>
      </template>
    </section>
  </div>
</template>
<script>
import axios from 'axios';
import Datepicker from 'vuejs-datepicker';
import Constantes from '../../store/constantes.js';
import VModal from 'vue-js-modal'
import { ModelSelect } from 'vue-search-select'
import moment from "moment";
import { es } from 'vuejs-datepicker/dist/locale'
import Multiselect from 'vue-multiselect'
import { BDropdown } from 'bootstrap-vue'
import { DropdownPlugin } from 'bootstrap-vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import TituloHeader from '../comun/TituloHeader'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
const parametrosModalConst = [{nombre : 'MOSTRAR', id: 0},{nombre : 'EDITAR', id: 1}];
export default {
  name:'RegistroActividades',
  components: {
    Datepicker,
    ModelSelect,
    Multiselect,
    TituloHeader,
    Loading,
    BDropdown
  },
  data(){
    return{
      filters: [
        {
          value: '',
          'search_prop': 'namearea' // define search_prop for backend usage.
        }
      ],
      titles: [
        {prop: "namearea",      label: "Uni. Orgánica",   },
        {prop: "area",          label: "Correo de Unidad",},
        {prop: "Teléfono",      label: "Teléfono",        size: "110%"},
        {prop: "Estado",        label: "Estado",          size: "100%"},
        {prop: "Jefe",          label: "Correo del Jefe", },
        {prop: "estado",        label: " ",               size: "90%"},
      ],
      isLoading: false,
      isDisabled: true,
      parametroModal: 0,
      parametrosModal: parametrosModalConst,
      showModal: false,
      showInter: false,
      estiloDisplayAdministrado: '',
      date: new Date,
      regBool: false,
      fechaSelEnvio: new Date,
      fechaModal:null,
      areaSesion:localStorage.getItem('desUnidadLogueado'),
      usuSesion:localStorage.getItem('cuenta'),
      uniSesion:localStorage.getItem('codUnidadLogueado'),
      fechaDatePicker: new Date,
      es: es,
      duracion: '',
      descripcion:'',
      listaAreas:[],
      mapListaAreas:[],       
      campoArea: [
        { key: 'nombreArea', label: 'Nombre de Unidad', sortable: true, sortDirection: 'desc' },
        { key: 'correoArea', label: 'Correo de Unidad', sortable: true },
        { key: 'telefonoArea', label: 'Teléfono', sortable: true },
        { key: 'estado', label: 'Estado', sortable: true },
        { key: 'responsableArea', label: 'Correos de Responsables', sortable: true },
        { key: 'jefeArea', label: 'Correo del Jefe', sortable: true },        
        { key: 'actions', label: 'Acción' }
      ],  
      indice: 1,
      totalRows: 1,
      currentPage: 1,
      pageSize: 10,
      pageOptions: [10, 20, 50, 100],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],   
      estadoReg:1,   
      infoModal: {
        id: 'info-modal',
        title: '',
        content: ''
      },
      idAreaModal:0,
      estadoModalIni:0,
      estadoModal:0,
      correoModal:'',
      telefonoModal:'',
      responsablesModal:'',
      correojefeModal:'',
      boolCorreos:true,
      boolCampos:false,
      valCorreoArea:false,
      valCorreoJefe:false,
      valCorreoResp:false,
      campoCorreoArea:false,
      campoCorreoJefe:false,
      campoCorreoResp:false,
      copiasCorreo:[],
      headerBgVariant: 'warning',
      headerTextVariant: 'dark',
      bodyBgVariant: 'light',
      bodyTextVariant: 'dark',
      footerBgVariant: 'dark',
      footerTextVariant: 'light',
      mapListaAreasConst: [],
      iteradorPaginado: 0,
    }
  },
  mounted(){
    if(localStorage.getItem('logueado')=='true'){
      console.log('está logueado');
      console.log(localStorage);  
      console.log(localStorage.getItem('codUnidadLogueado') );
      this.obtenerAreas(1);
      console.log("numero de registros"+this.mapListaAreas.length)
      this.totalRows = this.mapListaAreas.length
      
    }else{
      this.$router.push('/auth/login/');
    }
    
  },  
  computed: {
    sortOptions() {
      return this.campoArea
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key }
        })
    },
  },
  methods:{  
    CambiarPagina(pagina){
      console.log("CambiarPagina")
      console.log(pagina)
      switch (pagina.type) {
        case 'filter':
          console.log("FILTER")
          this.filtrado(pagina)
          break;
        default:
          console.log("DEFAULT")
          if (pagina.page > 0) {
            this.indice = pagina.page
            this.pageSize = pagina.pageSize
            if(this.iteradorPaginado>0)this.controlPaginado()
            this.iteradorPaginado++
          }
          break;
      }
    },
    controlPaginado(){
      this.mapListaAreas = this.mapListaAreasConst.slice((this.indice - 1) * this.pageSize, this.indice * this.pageSize);
    },
    filtrado(pagina){
      console.log("search");
      console.log(pagina.filters[0].value);
      let search =pagina.filters[0].value
      let data = this.mapListaAreasConst;
      let aux = [];
      if(search != ''){
        data  = data.forEach(item=>{
          if(item.nombreArea.includes(search.toUpperCase())) aux.push(item)
          console.log(item);
        });
        this.totalRows = this.mapListaAreas.length
        console.log(aux);
        this.mapListaAreas = aux
      }else{
        this.controlPaginado()
        this.totalRows = this.mapListaAreasConst.length
      }
    },
    handleSizeChange(val) {
        console.log(`${val} items per page`);
      },
    handleCurrentChange(val) {
      console.log(`current page: ${val}`);
    },
    reemplazarElemento(cadena, antiguo, nuevo){
      if(cadena != null || cadena != undefined)cadena = cadena.replace(antiguo,nuevo)
      return cadena;
    },
    obtenerAreas(idEstado){
      this.mapListaAreas =[];
      var ruta = Constantes.rutaTramite+'tramite-area/'+idEstado
      // var ruta = Constantes.rutaTramite+'tramite-area/'+idEstado+'/'+nombreArea
      console.log(ruta);
      axios.get(ruta).then( response=>{
        let data=response.data;
        var i=0;
        console.log(data)
        data.forEach(item=>{
          item.estado = item.idEstado==1?'Activo':'Inactivo';
          this.mapListaAreas.push(item);
        });
        this.mapListaAreasConst= this.mapListaAreas;
        this.totalRows =this.mapListaAreasConst.length;
        this.controlPaginado()
        console.log("lista de  areas --->"+this.mapListaAreas);
        if(data.length==0) this.mapListaAreas =[];
      }).catch(e=>console.log(e))
    },
    guardarCambios(){  
      this.validaCorreos();
      this.validaCampos();
      if((this.boolCorreos && this.boolCampos) || this.estadoModal!=this.estadoModalIni){
      this.$swal({
        title: 'Confirmación de actualización',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        showCloseButton: true,
        showLoaderOnConfirm: true
      }).then((result) => {
          if(result.value) {
            // var rr = 'http://localhost:8090/api/tramites/tramite-area-edicion';
            var ruta = Constantes.rutaTramite+'tramite-area-edicion'
            let dataPost = {};
            dataPost.idArea = this.idAreaModal;
            dataPost.correoResponsable = this.responsablesModal==null?'':this.responsablesModal;
            dataPost.correoArea = this.correoModal==null?'':this.correoModal;
            dataPost.telefonoArea = this.telefonoModal==null?'':this.telefonoModal;                        
            dataPost.correoJefe = this.correojefeModal==null?'':this.correojefeModal;
            dataPost.idEstado = this.estadoModal;
              axios.post(ruta,dataPost).then(response=>{
              console.log('respuesta... ');
              console.log(response);
              this.$swal({
                title: 'Registro exitoso',
                icon: 'success',
                confirmButtonText: 'OK',   
                showLoaderOnConfirm: true,
                allowOutsideClick: false
                }).then((result) => {
                  if(result.value) {                
                      location.reload();
                  }
                })
            }).catch(e=>console.log(e))
          }else{
            this.showModal = true;
          }
        })
      }else{
        if(!this.boolCorreos && !this.boolCampos){
          this.$swal({
            icon: "error",
            text: "Verifique información ingresada."
          });
        }
      }
    }, 
    reemplazaVacio(cadena,reemplazo){
      return cadena==''?'-':cadena;
    },
    reemplazaVacioEntero(cadena,reemplazo){
      return cadena==''?'0':cadena;
    },   
    validaCorreos(){   
      console.log("Datos a validar ->>>"+this.correoModal+" "+this.responsablesModal+" "+this.correojefeModal)           
        if(this.correoModal!=null && this.correoModal!=''){ 
            if(!this.validEmail(this.correoModal.trim())) { 
                this.boolCorreos=false;
                this.valCorreoArea = false;
                console.log("primero ->"+this.boolCorreos)

              }else{
                this.valCorreoArea = true;
                this.campoCorreoArea = true;     
              }
        }else{
                this.valCorreoArea = true;
        }

        if(this.responsablesModal!=null && this.responsablesModal!=''){
            if(this.responsablesModal.includes(",")) { 
              this.copiasCorreo = this.responsablesModal.split(",");
              
              for (var i = 0; i<this.copiasCorreo.length; i++) {
                if(!this.validEmail(this.copiasCorreo[i].trim())) { 
                  this.boolCorreos=false;
                  this.valCorreoResp = false;
                  console.log("segundo ->"+this.boolCorreos)
                  console.log("correos responsable ->"+this.copiasCorreo[i])
                  break; 
                }else{
                  this.valCorreoResp = true;
                  this.campoCorreoResp = true;
                }
              }
            }else {
              if(!this.validEmail(this.responsablesModal.trim())) {
                this.boolCorreos=false;
                this.valCorreoResp = false;
                console.log("tercero ->"+this.boolCorreos)
              }else{
                this.valCorreoResp = true;
                this.campoCorreoResp = true;
              }
            }
        }else{
                this.valCorreoResp = true;
        }

        if(this.correojefeModal!=null && this.correojefeModal!=''){
          if(this.correojefeModal.includes(",")){
            this.copiasCorreo = this.correojefeModal.split(",");
            for (var i = 0; i<this.copiasCorreo.length; i++) {
                if(!this.validEmail(this.copiasCorreo[i].trim())) { 
                  this.boolCorreos=false;
                  this.valCorreoJefe = false;
                  console.log("cuarto ->"+this.boolCorreos)
                  console.log("correos responsable ->"+this.copiasCorreo[i])
                  break; 
                }else{
                  this.valCorreoJefe = true;
                  this.campoCorreoJefe = true;
                }
              }
          }else{
            if(!this.validEmail(this.correojefeModal.trim())) {
                this.boolCorreos=false;
                 this.valCorreoJefe = false;
                console.log("quinto ->"+this.boolCorreos)
              }else{
                this.valCorreoJefe = true;
                this.campoCorreoJefe = true;
              }  
          }      
        }else{
                this.valCorreoJefe = true;
        }
        if(this.valCorreoArea && this.valCorreoResp && this.valCorreoJefe){
          this.boolCorreos=true;
        }
        console.log(this.boolCorreos)
    },
    validaCampos(){
      console.log("validacion de campos -->"+this.campoCorreoArea +" "+ this.campoCorreoJefe +" "+ this.campoCorreoResp);
        if(this.campoCorreoArea || this.campoCorreoJefe || this.campoCorreoResp || (this.telefonoModal!=null && this.telefonoModal!='')){
          this.boolCampos=true
        }else{
          this.boolCampos=false
        }
    },
    validEmail: function (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    customFormatter(date) {
            return moment(date).format('YYYY-MM-DD');
    },
    customFormatCal(date) {
            return moment(date).format('D MM YYYY');
    }, 
    PadLeft(value, length) {
      return (value.toString().length < length) ? PadLeft("0" + value, length) : value;
    },
    abririnfo(item){
      console.log(item);
      this.info(item, this.parametrosModal[0]);
    },
    info(item, parametroModal) {
      console.log(item);
      console.log(parametroModal)
      this.showModal=true;
      if(parametroModal.id==1)this.isDisabled=false;
      this.parametroModal = parametroModal.id
      this.infoModal.title = item.nombreArea;
      this.infoModal.content = JSON.stringify(item, null, 2)
      console.log("item ------------>"+item.nombreArea);
      console.log("id de unidad --->"+item.idArea);
      this.idAreaModal = item.idArea;
      this.correoModal = item.correoArea; 
      this.telefonoModal = item.telefonoArea;
      if(parametroModal.id==0)this.responsablesModal = this.reemplazarElemento(item.responsableArea,/[,]/gi,"\n");
      this.responsablesModal = item.responsableArea
      this.correojefeModal = item.jefeArea;
      this.estadoModal = item.idEstado;
      this.estadoModalIni = item.idEstado;
        // this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetInfoModal() {
      this.showModal = false;
      this.isDisabled= true;
      this.infoModal.title = ''
      this.infoModal.content = ''
    },
    onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        console.log("paginacion --->"+filteredItems.length)
        this.currentPage = 1
    }   

  },
  // filters:{
  //   pintaPuntos(pagina){
  //     if(pagina==-1){
  //       return '...';
  //     }
  //     else{
  //       return pagina;
  //     }
  //   }
  // }
}

</script>
<style>
</style>
<style lang="scss" scoped>
  .el-col {
    margin-top: 15px;
  }
</style>

