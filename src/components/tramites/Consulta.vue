<template>
  <div class="content-wrapper">
    <loading :active.sync="isLoading" :is-full-page="true" color="#007BFF"></loading>
    <titulo-header>Consulta de Trámite</titulo-header>
    <section class="content">
      <div class="row">
        <div class="col-12">
          <div class="card menu">
            <!-- <el-row :gutter="10">
              <label>Realizar Búsqueda:</label>
              <el-radio-group v-model="tipoFiltro">
                <el-radio :label="1" border size="medium">Por Tipo de Doc.</el-radio>
                <el-radio :label="2" border size="medium">Por Fecha</el-radio>
                <el-radio :label="3" border size="medium">Por Solicitante</el-radio>
                <el-radio :label="4" border size="medium">Por Solicitud</el-radio>
              </el-radio-group>
            </el-row> -->
            <el-row :gutter="10">
              <!-- <template v-if="tipoFiltro==1"> -->
              <template>
                <el-col :xs="24" :sm="4">
                  <label class="d-none d-md-block right col-form-label">Tipo Documento</label>
                  <label class="d-xs-block d-md-none col-form-label">Tipo Documento</label>
                </el-col>
                <el-col :xs="24" :sm="8">
                  <el-select v-model="id008TipoDocumento">
                    <el-option :value="0" label="TODOS"></el-option>
                    <el-option v-for="tipoDocumento of lista008TipoDocumento" :key=tipoDocumento.idParametro :value="tipoDocumento.idParametro" :label="tipoDocumento.nombre"></el-option>
                  </el-select>
                </el-col>
              </template>
              <!-- <template v-if="tipoFiltro==1"> -->
                <!-- <div class="form-group col-sm-5">
                  <div class="row">
                      <label for="exampleInputPassword1" class="col-sm-3 col-form-label" style="padding-right: 0px; !important">Año / Número</label>
                      <div class="col-sm-3" style="padding-right: 0px; !important">
                          <input type="text" class="form-control" placeholder="Ingrese Año" v-model="anioExpedienteModelo">
                      </div>
                      <div class="col-sm-5" style="padding-right: 0px; !important">
                          <input type="text" class="form-control" placeholder="Ingrese Documento" v-model="numeroExpedienteModelo">
                      </div>
                  </div>
                </div> -->
            </el-row>
            <el-row :gutter="10">
              <template>
                <el-col :xs="24" :sm="4">
                  <label class=" d-none d-md-block right col-form-label" >Solicitante</label>
                  <label class=" d-xs-block d-md-none  col-form-label" >Solicitante</label>
                </el-col>
                <el-col :xs="24" :sm="4">
                  <el-select id="ddlTipoDocumento" v-model="idTipodocumento">
                    <el-option :value="0" label="TODOS"></el-option>
                    <el-option v-for="tipoDocumento of listaTipoDocumento" :key=tipoDocumento.idParametro :value="tipoDocumento.idParametro" :label="tipoDocumento.nombre"></el-option>
                  </el-select>
                </el-col>
                <el-col class="d-none d-md-block" :xs="24" :sm="4">
                  <el-input class="btn-block" clearable placeholder="Nro. Documento" v-model="numeroDocumentoModelo"/>
                </el-col>
                <el-col class="d-xs-block d-md-none pt-2" :xs="24" :sm="4">
                  <el-input clearable placeholder="Nro. Documento" v-model="numeroDocumentoModelo"/>
                </el-col>
              </template>
              <template>
                <el-col :xs="24" :sm="4">
                  <label class=" d-none d-md-block right col-form-label" >Tipo Trámite</label>
                  <label class=" d-xs-block d-md-none  col-form-label" >Tipo Trámite</label>
                </el-col>
                <el-col :xs="24" :sm="8">
                  <model-select :options="mapListaTipoTramite" v-model="itemTramite"
                        placeholder="Seleccione un Servicio" >
                  </model-select>
                </el-col>
              </template>
              <!-- <template v-if="tipoFiltro==3"> -->
            </el-row>
            <el-row :gutter="10">
                <!-- <template v-if="tipoFiltro==4"> -->
              <template>
                <el-col :xs="24" :sm="4">
                  <label class="d-none d-md-block right col-form-label" >Estado</label>
                  <label class="d-xs-block d-md-none col-form-label" >Estado</label>
                </el-col>
                <el-col :xs="24" :sm="8">
                  <el-select v-model="idEstado">
                    <el-option :value="0" label="TODOS"></el-option>
                    <el-option v-for="estado of listaEstado" :key=estado.idParametro :value="estado.idParametro" :label="estado.nombre"></el-option>
                    <el-option :value="1" label="ATENDIDO"></el-option>
                    <el-option :value="2" label="ARCHIVADO"></el-option>
                  </el-select>
                </el-col>
              </template>
                <!-- <template v-if="tipoFiltro==1 || tipoFiltro==2"> -->
              <template>
                <el-col :xs="24" :sm="4">
                  <label class="d-none d-md-block right col-form-label" >Unid. Orgánica</label>
                  <label class="d-xs-block d-md-none  col-form-label" >Unid. Orgánica</label>
                </el-col>
                <el-col :xs="24" :sm="8">
                  <model-select :options="mapListaUnidadOrganica" v-model="itemUnidadOrganica" placeholder="Seleccione una Unidad" ></model-select>
                </el-col>
              </template>
            </el-row>
            <!-- <el-row :gutter="10">
                  <div class="form-group col-sm-5" v-if="tipoFiltro==2">
                    <div class="row">
                      <label for="exampleInputPassword1" class="col-sm-3 col-form-label">Fecha Inicio /Fin</label>
                    <div class="col-sm-4" style="padding-right: 0px; !important">
                          <datepicker :language="es" :open-date="date" input-class="datepicker text-center"  
                                    name="calendarioCitas" :format="customFormatter" v-model="fechaInicioModelo" 
                                    @opened="datepickerAbierto" 
                                    @selected="fechaInicioSeleccionada" 
                                    @closed="datepickerInicioCerrado" 
                                    @cleared="valorFechaInicioRemovido" >
                              </datepicker>  
                      </div>
                    <div class="col-sm-4" style="padding-right: 0px; !important">
                            <datepicker :language="es" :open-date="date" input-class="datepicker text-center"  
                                    name="calendarioCitas" :format="customFormatter" v-model="fechaFinModelo" 
                                    @opened="datepickerAbierto" 
                                    @selected="fechaFinSeleccionada" 
                                    @closed="datepickerFinCerrado" 
                                    @cleared="valorFechaFinRemovido" >
                              </datepicker>  
                      </div>
                    </div>
                  </div> 
                <template v-if="tipoFiltro==2"> 
              </el-row>-->
            <el-row :gutter="10">
              <template>
                <el-col :xs="24" :sm="4">
                  <label class="d-none d-md-block right col-form-label">N° Solicitud</label>
                  <label class="d-xs-block d-md-none  col-form-label">N° Solicitud</label>
                </el-col>
                <el-col :xs="24" :sm="8">
                  <el-input placeholder="Ingrese N° Solicitud" clearable v-model="numeroSolicitudModelo"></el-input>
                </el-col>
              </template>
              <template>
                <el-col :xs="24" :sm="4">
                  <label class="d-none d-md-block right col-form-label">Fecha</label>
                  <label class="d-xs-block d-md-none  col-form-label">Fecha</label>
                </el-col>
                <el-col :xs="24" :sm="8"><div class="dateElement">
                  <el-date-picker v-model="fechaRango" type="daterange" range-separator="a" start-placeholder="Fecha Inicio" end-placeholder="Fecha Fin">
                  </el-date-picker></div>
                </el-col>
              </template>
            </el-row>
            <el-row :gutter="10" class="d-flex justify-content-sm-end">
              <el-col :xs="24" :sm="4">
                <el-button type="primary" class="btn-block" @click="getTramites">Buscar</el-button>   
              </el-col>
              <!-- <el-col :xs="24" :sm="4">
                <el-button type="primary" class="btn-block" icon="el-icon-document" @click="getTramitesExcel">Exportar</el-button>
              </el-col> -->
              <el-col :xs="24" :sm="4">
                <el-button type="primary" class="btn-block" icon="el-icon-document" @click="exportarExcelJava">Exportar</el-button>
              </el-col>
            </el-row>
          </div>
          <div class="d-none d-md-block card menu">
            <table id="example2" class="table table-hover table-sm mb-0">
              <thead class="text-nowrap">
                <tr>
                  <th width="5%">Trámite</th>
                  <th width="5%">Documento</th>
                  <th width="15%">Solicitante</th>
                  <th width="15%">Unid. Orgánica</th>
                  <th width="25%">Tipo Trámite</th>
                  <th width="7%">Tipo Documento</th>
                  <th width="7%">F. Revisión</th>
                  <th width="7%">F. Aprobación</th>
                  <th width="7%">Estado</th>
                </tr>
              </thead>
              <tbody>
              <tr v-for="tramite of tramitesJson" :key=tramite.idTramite  v-on:dblclick="Editar(tramite.idTramite)">
                <!-- <tr v-for="tramite of tramitesJson" :key=tramite.idTramite  -->
                <td>ST-00{{tramite.idTramite}}</td>
                <td >
                  <template v-if="tramite.id011Estado.idParametro==24">
                    {{tramite.tipoTramite.id008Tipo.abreviatura}}  {{tramite.expedientePosgre.numeroExpediente}} - {{(tramite.fechaAprobacion).substr(0,4)}}
                  </template>
                  <template v-else><slot class="text-mute"></slot></template>
                </td>
                <td>{{tramite.numeroDocumentoSolicitante}}- {{tramite.nombresSolicitante}}</td> 
                <td>{{tramite.unidadDestino.uniorgnom}}</td> 
                <td>{{tramite.tipoTramite.nombre}}</td>
                <td>{{tramite.tipoTramite.equivalenciaOracle}}</td>
                <td>{{tramite.fechaPresentacion}}</td>
                <td>{{tramite.fechaAprobacion}}</td>
                <td> {{tramite.id011Estado.nombre}} <span :class="obtenerSemaforo(tramite.id011Estado.idParametro,tramite.fechaPresentacionRevision,tramite.fechaPresentacionSubsanacion)"></span></td>
              </tr>
              </tbody>
            </table>
            <div class="d-flex justify-content-center block">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="indice"
                :page-sizes="pageOptions"
                :pagination-props="{ background: true, pageSizes: pageSize }"
                :hide-on-single-page="hide_on_single_page"
                layout="prev, pager, next, jumper, sizes, total"
                :total="(tramitesJson != null && tramitesJson != undefined && tramitesJson.length>0) ? tramitesJson[0].totalBandeja: 0">
              </el-pagination>
            </div>
          </div>
          <div class="d-xs-block d-md-none card menu">
            <table id="example2" class="table table-hover table-sm mb-0">
              <thead class="text-nowrap">
                <tr>
                  <th width="5%">Trámite</th>
                  <th width="15%">Solicitante</th>
                  <th width="15%">Unid. Org.</th>
                  <th width="25%">Tip. Trámite</th>
                  <th width="7%">Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="tramite of tramitesJson" :key=tramite.idTramite  v-on:dblclick="Editar(tramite.idTramite)">
                  <!-- <tr v-for="tramite of tramitesJson" :key=tramite.idTramite  -->
                  <td>ST-00{{tramite.idTramite}}</td>
                  <td>{{tramite.numeroDocumentoSolicitante}}- {{tramite.nombresSolicitante}}</td> 
                  <td>{{tramite.unidadDestino.uniorgnom}}</td> 
                  <td>
                    <template>
                      <div class="text-wrap" style="width:100% ;max-width: 20vw">{{tramite.tipoTramite.nombre}}</div>
                    </template>
                  </td>
                  <td> {{tramite.id011Estado.nombre}} <span :class="obtenerSemaforo(tramite.id011Estado.idParametro,tramite.fechaPresentacionRevision,tramite.fechaPresentacionSubsanacion)"></span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import XLSX from 'xlsx'
import VueExcelXlsx from "vue-excel-xlsx";   //     prueba 8 y 33
import { es } from 'vuejs-datepicker/dist/locale'
import axios from 'axios';
import Datepicker from 'vuejs-datepicker';
import Constantes from '../../store/constantes.js';
import { ModelSelect } from 'vue-search-select'
import moment from "moment";
import Vue from 'vue'   //     prueba 8 y 33 y otros
Vue.use(VueExcelXlsx);   //     prueba 8 y 33
import TituloHeader from "../comun/TituloHeader";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  name:'BandejaCertificado',
  components: {
    ModelSelect,
    Datepicker,
    TituloHeader,
    Loading,
  },
  data(){
    return{
      hide_on_single_page: true,
      isLoading: false,
      tipoFiltro:1,
      fechaRango: null,
      certificadosJson:null,
      tramitesJson:null,
      tramitesJsonExcel:null,
      listaParametrosAux:null,
      listaEstado:null,
      listaTipoDocumento:null,
      listaTramite:null,
      idTipodocumento:0,
      idTipoTramite:0,
      idEstado:23,
      numeroDocumentoModelo:'',
      numeroExpedienteModelo:'',
      anioExpedienteModelo:'',
      manzanaModelo:'',
      loteModelo:'',
      indice:1,
      pageSize: 10,
      pageOptions: [10, 20, 50, 100],
      listaPaginas:null,
      lista008TipoDocumento:null,
      id008TipoDocumento:0,
      mapListaTipoTramite:[],
      itemTramite:0,
      mapListaUnidadOrganica:[],
      itemUnidadOrganica:0,
      numeroSolicitudModelo:'',
      date: new Date,
      fechaInicioModelo:null,
      fechaFinModelo:null,
      //fechaDatePicker: new Date, 
      es: es,
      fechaLimite:null,
      exportarExcel:null,
    }
  },
  mounted(){
    if(localStorage.getItem('logueado')=='true'){
      this.getParametros(11);
      //this.getCertificados();
      this.getParametros(4);
      this.getParametros(8);
      this.getTramites();
      this.getIdTipoTramite();
      this.getUnidadOrganica();
      
    }else{
      this.$router.push('/auth/login/');
    }
    
  },
  methods:{
    handleSizeChange(val) {
      console.log(`${val} items per page`);
      this.pageSize = val
      this.getTramites();
    },
    handleCurrentChange(val) {
      console.log(`current page: ${val}`);
      this.indice = val
      this.getTramites();
    },
    exportarExcelJava(){
      let fechaInicio = this.fechaRango == null ? '': moment(this.fechaRango[0]).format('YYYY-MM-DD');
      let fechaFin = this.fechaRango == null ? '': moment(this.fechaRango[1]).format('YYYY-MM-DD');
      console.log("BUSCANDO FECHA" + fechaInicio)
      const url=Constantes.rutaTramite+'tramites-consulta/excel-tramites/'+this.reemplazaVacioEntero(this.numeroSolicitudModelo)+'/'+this.idEstado+'/'+this.itemTramite + '/' + this.reemplazaVacio(this.numeroDocumentoModelo)
                +'/'+this.id008TipoDocumento+'/'+this.reemplazaVacio(this.anioExpedienteModelo) 
                +'/'+ this.reemplazaVacio(this.numeroExpedienteModelo)+'/'+this.itemUnidadOrganica
                +'/'+ this.reemplazaVacio(fechaInicio)+'/'+this.reemplazaVacio(fechaFin)
                +'/'+ 0+'/'+0;
      window.open(url, '_blank')
    },
    fabricarExcel(){
      var arrays = [];
      for(var valores of this.tramitesJsonExcel){
        var objetos = new Object();
        objetos['Tramite']      = "ST-00"+ valores.idTramite;
        objetos['Documento']      = valores.id011Estado.idParametro==24?valores.tipoTramite.id008Tipo.abreviatura + " " + 
                                  valores.expedientePosgre.numeroExpediente + " - " + valores.fechaAprobacion.substr(0,4):"";
        objetos['Solicitante']      =  valores.numeroDocumentoSolicitante + " - " + valores.nombresSolicitante;
        objetos['UnidadOrganica']      =  valores.unidadDestino.uniorgnom;
        objetos['TipoTramite']      =  valores.tipoTramite.nombre;
        objetos['TipoDocumento']      = valores.tipoTramite.equivalenciaOracle;
        objetos['FechaPresentacion']      = valores.fechaPresentacion;
        objetos['FechaAprobacion']      = valores.fechaAprobacion;
        objetos['Estado']      = valores.id011Estado.nombre;
        arrays.push(objetos)
      }
      this.exportarExcel = arrays
    },
    exportExcel() {
      if(this.tramitesJsonExcel == undefined){
        alert("LISTA VACIA NO SE PUEDE GENERAR EXCEL")
      } else{
        this.fabricarExcel()
        var wscols = [
          {wch:20},{wch:20},{wch:50},{wch:50},{wch:20},{wch:20},{wch:20},{wch:20},
          {wch:20, hidden:false},
        ];
        var wsrows = []
        var objeto = new Object();
        objeto.hpx = 30
        wsrows.push(objeto)
        for( var valor of this.exportarExcel){
          var objeto = new Object();
          objeto.hpx = 30
          wsrows.push(objeto)
        }

        //si se quiere agregar mas hojas se añade aqui
        let data = XLSX.utils.json_to_sheet(this.exportarExcel)
        const workbook = XLSX.utils.book_new()
        const filename = 'Lista de Tramites'
        data['!cols'] = wscols;
        data['!rows'] = wsrows;
        
        XLSX.utils.book_append_sheet(workbook, data, filename)
        XLSX.writeFile(workbook, `${filename}.xlsx`)
      }
    },
    obtenerSemaforo(id011Estado,fechaPresentacionRevision,fechaPresentacionSubsanacion){
      var clase="";
      var start_date= moment(new Date()).local().format('YYYY-MM-DD')
      var diferencia=0;
      
      if(id011Estado==23 && fechaPresentacionRevision!=null){
        var end_date=moment(fechaPresentacionRevision).local().format('YYYY-MM-DD')
        const start = moment(this.fechaLimite);
        const end = moment(end_date);
        diferencia= end.diff(start, 'days');
        clase=diferencia<0?"succR": diferencia==0? "succN": "succ"
      }
      if(id011Estado==42 && fechaPresentacionSubsanacion!=null){
        var end_date=moment(fechaPresentacionSubsanacion).local().format('YYYY-MM-DD')
        const start = moment(this.fechaLimite);
        const end = moment(end_date);
        diferencia= end.diff(start, 'days');
        clase=diferencia<0?"succR": diferencia==0? "succN": "succ"
      }
      return clase;
    },
      customFormatter(date) {
            return moment(date).format('YYYY-MM-DD');
    },  
    //para calendario
    datepickerAbierto: function() {
            
    },
    fechaInicioSeleccionada: function() {
            
            this.$nextTick(() => console.log(this.fechaInicioModelo))
    },
    datepickerInicioCerrado: function() {
            
            var fechaSel=moment(this.fechaInicioModelo).format('D/MM/YYYY');
            
    },
    valorFechaInicioRemovido(){
      
      this.fechaInicioModelo = ' '
    },
    fechaFinSeleccionada: function() {
            
            this.$nextTick(() => console.log(this.fechaFinModelo))
    },
    datepickerFinCerrado: function() {
            
            var fechaSel=moment(this.fechaFinModelo).format('D/MM/YYYY');
            
    },
    valorFechaFinRemovido(){
      
      this.fechaFinModelo = ' '
    },
    getUnidadOrganica(){
        axios.get(Constantes.rutaTramite+'unidadorganica/-')
                    .then(response=>{
                    
                    var i=0;
                      while(i<response.data.data.length){
                            var unidadorganica={};
                            unidadorganica.value=response.data.data[i].uniorgcod;
                            unidadorganica.text=response.data.data[i].uniorgnom;
                            this.mapListaUnidadOrganica.push(unidadorganica);
                            i++;
                        }
                  })
                  .catch(e=>console.log(e))
    },
    getIdTipoTramite(){
      axios.get(Constantes.rutaTramite+'tipotramite/-/0')
                    .then(response=>{
                    this.listaTramite=response.data.data;
                    var i=0;
                      while(i<this.listaTramite.length){
                            var tipoTramite={};
                            tipoTramite.value=this.listaTramite[i].idTipoTramite;
                            tipoTramite.text=this.listaTramite[i].nombre;
                            this.mapListaTipoTramite.push(tipoTramite);
                            i++;
                        }
                  })
                  .catch(e=>console.log(e))
    },
    getParametros(grupo){
      axios.get(Constantes.rutaTramite+'parametro/'+grupo+'/0')
                    .then(response=>{
                    switch(grupo){
                      case 4: 
                        {
                          
                          this.listaTipoDocumento=response.data.data;
                          
                        };
                        break;
                      case 11: 
                        {
                          
                          this.listaEstado=response.data.data;
                          this.listaEstado.splice(0, 1);
                        };
                      case 8: 
                        {
                          
                          this.lista008TipoDocumento=response.data.data;
                        };
                        break;
                    }
                    
                  })
                  .catch(e=>console.log(e))
    },
    reemplazaVacio(cadena,reemplazo){
      return cadena==''?'-':cadena;
    },
    reemplazaVacioEntero(cadena,reemplazo){
      return cadena==''?'0':cadena;
    },
    getTramitesExcel(){
      let fechaInicio = this.fechaRango == null ? '': moment(this.fechaRango[0]).format('YYYY-MM-DD');
      let fechaFin = this.fechaRango == null ? '': moment(this.fechaRango[1]).format('YYYY-MM-DD');
      console.log("BUSCANDO FECHA" + fechaInicio)
      //var url=Constantes.rutaTramite+'tramites/0/'+this.idEstado+'/'+this.idTipoTramite + '/' + this.reemplazaVacio(this.numeroDocumentoModelo);
      var url=Constantes.rutaTramite+'tramites-consulta/'+this.reemplazaVacioEntero(this.numeroSolicitudModelo)+'/'+this.idEstado+'/'+this.itemTramite + '/' + this.reemplazaVacio(this.numeroDocumentoModelo)
              +'/'+this.id008TipoDocumento+'/'+this.reemplazaVacio(this.anioExpedienteModelo) 
              +'/'+ this.reemplazaVacio(this.numeroExpedienteModelo)+'/'+this.itemUnidadOrganica
              +'/'+ this.reemplazaVacio(fechaInicio)+'/'+this.reemplazaVacio(fechaFin)
              +'/'+ 0+'/'+0;
      console.log('url tramites get:'+ url);
      axios.get(url).then(response=>{
        this.tramitesJsonExcel=response.data.data;
        this.exportExcel();
      }).catch(e=>console.log(e))
    },
    getTramites(){
        let fechaInicio = this.fechaRango == null ? '': moment(this.fechaRango[0]).format('YYYY-MM-DD');
        let fechaFin = this.fechaRango == null ? '': moment(this.fechaRango[1]).format('YYYY-MM-DD');
        console.log("BUSCANDO FECHA" + fechaInicio)
        //var url=Constantes.rutaTramite+'tramites/0/'+this.idEstado+'/'+this.idTipoTramite + '/' + this.reemplazaVacio(this.numeroDocumentoModelo);
        var url=Constantes.rutaTramite+'tramites-consulta/'+this.reemplazaVacioEntero(this.numeroSolicitudModelo)+'/'+this.idEstado+'/'+this.itemTramite + '/' + this.reemplazaVacio(this.numeroDocumentoModelo)
                +'/'+this.id008TipoDocumento+'/'+this.reemplazaVacio(this.anioExpedienteModelo) 
                +'/'+ this.reemplazaVacio(this.numeroExpedienteModelo)+'/'+this.itemUnidadOrganica
                +'/'+ this.reemplazaVacio(fechaInicio)+'/'+this.reemplazaVacio(fechaFin)
                +'/'+ this.indice+'/'+this.pageSize;
        console.log('url tramites get:'+ url);
        axios.get(url).then(response=>{
            console.log(response.data);
            this.fechaLimite=response.data.fechaLimite;
            this.tramitesJson=response.data.data;
            var objeto=this.tramitesJson.data;
            this.listaPaginas=null
            this.listaPaginas=[1];
          })
          .catch(e=>console.log(e))
    },
    Editar(idTramite){
        this.$router.push('/components/tramites/detalletramite/'+idTramite)
    },
    PadLeft(value, length) {
            return (value.toString().length < length) ? PadLeft("0" + value, length) : value;
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
<style>
.datepicker {
    margin-left: 0rem;
    margin-right: 0rem;

    padding: 0.55rem 0.30rem;
    font-size: 0.9rem;
    line-height: 1.5;
    color: #495057;
    background-color: #ffffff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
.succ {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 6px;
    margin-left: 20px;
    background: #bed730;
}
.succN {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 6px;
    margin-left: 20px;
    background: #d77530;
}
.succR {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 6px;
    margin-left: 20px;
    background: #ec0b21;
}
</style>
<style lang="scss" scoped>
  .el-select {
    display: inline;
  }
</style>