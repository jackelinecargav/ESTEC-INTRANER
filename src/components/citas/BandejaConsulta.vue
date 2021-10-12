<template>
  <div class="content-wrapper">
    <loading :active.sync="isLoading" :is-full-page="true" color="#007BFF"></loading>
    <titulo-header>Consulta de Citas</titulo-header>
    <section class="content">
      <el-row :gutter="10">
        <div class="card menu">
            <el-row :gutter="10">
              <template>
                <el-col :md="3" class="text-right">
                  <label id="" class="col-form-label" >Unidad Orgánica</label>
                </el-col>
                <el-col :md="7">
                  <el-select v-model="areaBuscar" filterable>
                    <el-option :value="0" label="Todos"></el-option>
                    <el-option v-for="tipoDocumento of listaAreas" :key=tipoDocumento.idArea :value="tipoDocumento.idArea" :label="tipoDocumento.descripcion"></el-option>
                  </el-select>
                </el-col>
              </template>
              <template>
                <el-col :md="3" class="text-right">
                  <label class="col-form-label">Tipo de Atención</label>
                </el-col>
                <el-col :md="4">
                  <el-select id="ddlTipoDocumento" class="" v-model="tipoAtencionBuscar">
                    <el-option :value="0" label="Todos"></el-option>
                    <el-option :value="1" label="Presencial"></el-option>
                    <el-option :value="2" label="Virtual"></el-option>
                  </el-select>
                </el-col>
              </template>
              <template>
                <el-col :md="3" class="text-right">
                  <label class="col-form-label" >Estado</label>
                </el-col>
                <el-col :md="4">
                  <el-select id="estAtencion"  class="" v-model="estadoAtencion">
                    <el-option label="Todos" :value="0"></el-option>
                    <el-option label="Registrado" :value="1"></el-option>
                    <el-option label="Agendado" v-if="tipoAtencionBuscar != 1" :value="2"></el-option>
                    <el-option label="En Atención" :value="3"></el-option>
                    <el-option label="Atendido" :value="4"></el-option>
                    <el-option label="Desestimado" :value="5"></el-option>
                  </el-select>
                </el-col>
              </template>
            </el-row>
            <el-row :gutter="10">
              <template>
                <el-col :md="3" class="text-right">
                  <label for="dnibuscar" class="col-form-label">Documento</label>                    
                </el-col>
                <el-col :md="4">
                  <el-input id="dnibuscar" clearable placeholder="Nro. Documento" @keypress.native="soloNumeros" v-model="dniEscribir"/> 
                </el-col>
              </template>
              <template ><!-- DATE PICKER SEPARADO-->
                <!-- <div class="row col-md-3 rowmargin">
                  <label for="exampleInputPassword1" class="col-sm-4 col-form-label text-right" >Desde: </label>
                  <datepicker class="col-md-8" :bootstrap-styling="false" :language="es"  input-class="text-center datepicker"
                        name="calendarioCitas" v-model="fInicio">
                  </datepicker>
                </div>
                <div class="row col-md-3 rowmargin">
                  <label for="exampleInputPassword1" class="col-sm-4 col-form-label text-right" >Hasta: </label>                                              
                  <datepicker class="col-md-8" :bootstrap-styling="false" :language="es" input-class="text-center datepicker"  style="text-center"
                        name="calendarioCitas"  v-model="fFin" @selected="fechaSeleccionada">
                  </datepicker>                   
                </div> -->
              </template>
              <template><!-- DATE PICKER rango-->
                <el-col :md="3" class="text-right">
                  <label class="col-form-label">Fecha</label>
                </el-col>
                <el-col :md="7"><div class="dateElement">
                  <el-date-picker class="btn-block" v-model="fechaRango" type="daterange" range-separator="a" start-placeholder="Fecha Inicio" end-placeholder="Fecha Fin">
                  </el-date-picker></div>
                </el-col>
              </template>
              <template>
                <el-col :md="3" class="text-right">
                  <label class="col-form-label">Encuesta</label>
                </el-col>
                <el-col :md="4">
                  <el-select id="Encuesta" v-model="comboEncuesta">
                    <el-option :value="0" label="Todos"></el-option>
                    <el-option :value="1" label="Con Encuesta"></el-option>
                    <el-option :value="2" label="Sin Encuesta"></el-option>
                  </el-select>
                </el-col>
              </template>
            </el-row>
            <el-row :gutter="10" class=" d-flex justify-content-end">
              <template>
                <el-col :md="4">
                  <el-button class="btn-block" type="primary" v-on:click="tokensJson=null; metodoconsulta()" >Buscar</el-button>
                </el-col>
                <!-- <el-col :md="4">
                  <el-button class="btn-block" type="primary" @click="exportExcel" icon="el-icon-document" >Exportar</el-button>
                </el-col> -->
                <el-col :md="4">
                  <el-button class="btn-block" type="primary" @click="excelServicio" icon="el-icon-document" >Exportar</el-button>
                </el-col>
                <el-col :md="1">
                  <el-button type="primary" @click="Refrescar()" icon="el-icon-refresh" circle></el-button>
                </el-col>
              </template>
            </el-row>
              <!-- <el-alert class="col-md-12"
              :title=paramsSearch type="success" effect="dark" show-icon :closable="false">
            </el-alert>  -->
        </div> 
        <div class="card menu">
          <table ref="table" id="loremTable" class="table table-hover table-sm mb-2">
            <thead class=" text-nowrap">
            <tr >
              <th width="6%">Área</th>
              <th width="14%">Fecha - Hora</th>
              <!-- <th width="3%">Hora</th> -->
              <th width="8%">Token</th>
              <!-- <th width="3%">Tipo Doc.</th> -->
              <th width="26%">Documento - Nombre</th>
              <!-- <th width="10%"></th> -->
              <th width="20%">Motivo</th>
              <th width="8%">Estado</th>
              <th width="5%">Atención</th>
              <th width="8%">Encuesta</th>          
            </tr>
            </thead>
            <tbody>
            <tr v-for="citas of tokensJson" :key=citas.idCita v-on:dblclick="Visualizar(citas.idCita)">
              <td><el-tooltip class="my-0" :content="citas.descripcion" placement="bottom" effect="light"><label class="btn-block">{{recortar(citas.codigoCita)}}</label></el-tooltip></td>
              <td class="text-nowrap">{{citas.fecha}} - {{citas.hora}}</td>
              <!-- <td></td> -->
              <td>{{citas.token.idToken}}</td>
              <!-- <td></td> -->
              <td class="text-nowrap">{{citas.codigoTipoDocumento}}: {{citas.dni}} - {{citas.nombres}} {{citas.apePaterno}} {{citas.apeMaterno}}</td>
              <!-- <td></td>  -->
              <td>{{citas.motivo}}</td>
              <td >
                <template v-if="citas.indEstado==1">Registrado</template>
                <template v-else-if="citas.indEstado==2">Agendado</template>
                <template v-else-if="citas.indEstado==3">En Atencion</template>
                <template v-else-if="citas.indEstado==4">Atendido</template>
                <template v-else-if="citas.indEstado==5">Desestimado</template>
                <template v-else>Sin Estado</template>
              </td>
              <td class="text-center" >
                <template v-if="citas.tipoAtencion==1">
                  <el-tooltip class="my-0" content="Presencial" placement="bottom" effect="light"><label class="btn-block">P</label></el-tooltip>
                </template>
                <template v-else-if="citas.tipoAtencion==2">
                  <el-tooltip class="my-0" content="Presencial" placement="bottom" effect="light"><label class="btn-block">V</label></el-tooltip>
                </template>
                <template v-else>Sin Atencion</template>
              </td>
              <td v-if="citas.valoracionEncuesta>=2.5" class="text-center" >
                <el-button class="btn-success" @click="abrirModalEncuesta(citas.listRespuesta,citas.valoracionEncuesta)" icon="el-icon-check" circle></el-button>
              </td> 
              <td v-else-if="citas.valoracionEncuesta<=2.5&&citas.valoracionEncuesta>0" class="text-center">
                <el-button type="danger" @click="abrirModalEncuesta(citas.listRespuesta,citas.valoracionEncuesta)" icon="el-icon-warning-outline" circle></el-button>
              </td>
              <td v-else class="text-center"><el-button type="warning" disabled icon="el-icon-warning-outline" circle></el-button></td>
            </tr>
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
              :total="(tokensJson != null && tokensJson != undefined && tokensJson.length>0) ? tokensJson[0].paginado.totalRegistros: 0">
            </el-pagination>
          </div>
        </div>
      </el-row>
      <template>
        <el-dialog class="dialogConsultaEncuesta" :visible.sync="dialogFormVisible">
          <template>
            <question-customize  :valoracion='valoracion' :listQuestions=listQuestions></question-customize>
          </template>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogFormVisible = false">ok</el-button>
          </span>
        </el-dialog>
      </template>
    </section>
  </div>
</template>

<!--esto se usa con la funcon export excel
<script src="https://unpkg.com/vue"></script>-->
<!--<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.14.1/xlsx.full.min.js"></script>-->

<script>
 
import XLSX from 'xlsx'

import { es } from 'vuejs-datepicker/dist/locale'
import axios from 'axios'
import Datepicker from 'vuejs-datepicker'
import Constantes from '../../store/constantes.js'
import VModal from 'vue-js-modal'
import moment from "moment"
import TituloHeader from '../comun/TituloHeader'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import QuestionCustomize from '../citas/QuestionCustomize'

import VueExcelXlsx from "vue-excel-xlsx";   //     prueba 8 y 33
import Vue from 'vue'   //     prueba 8 y 33 y otros 
Vue.use(VueExcelXlsx);   //     prueba 8 y 33

// Vue.component( ' downloadExcel ' ,  JsonExcel )
export default {
  name:'BandejaCitas',
  data(){
    return{
      fechaRango: null,
      //sirve para los select
      comboEncuesta: null,
      listaAreas:null,
      //PARA LLAMAR AL METODO DE CONSULTA
      areaBuscar:'0',
      dniBuscar:'0',
      fechaBuscar:'0',
      tipoAtencionBuscar: 0,
      estadoAtencion: 0,
      tokensJson:null,
      exportExcelJson:null,
      date: new Date,
      dniEscribir:'',
      areaSesion:localStorage.getItem('desUnidadLogueado'),
      nombreSesion:localStorage.getItem('nombreCompletoLogueado'),
      usuSesion:localStorage.getItem('cuenta'),
      codUnidadCitas:localStorage.getItem('codUnidadCitas'),
      uniSesion:localStorage.getItem('codUnidadLogueado'),
      fInicio: new Date,
      fFin: new Date,
      es: es,
      isLoading: false,
      paramsSearch: '',
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
      listQuestions: null,
      valoracion: 0,
      indice: 1,
      pageSize: 10,
      pageOptions: [10, 20, 50, 100],
      hide_on_single_page: true,
    }
  },
  mounted(){
    if(localStorage.getItem('logueado')=='true'){
      console.log('está logueado');
      console.log(localStorage);
      this.Refrescar();
      this.getAreas();
      this.fechasInicio();
    }else{
      this.$router.push('/auth/login/');
    }
  },
  components: {
    Datepicker,
    VModal,
    Loading,
    TituloHeader,
    QuestionCustomize
  },
  methods:{
    handleSizeChange(val) {
      console.log(`${val} items per page`);
      this.pageSize = val
      this.metodoconsulta();
    },
    handleCurrentChange(val) {
      console.log(`current page: ${val}`);
      this.indice = val
      this.metodoconsulta();
    },
    recortar(palabra){
      var cad  = palabra
      if(palabra != null){
        cad = palabra.slice(0 , palabra.length-4 );
      }
      return cad;
    },
    abrirModalEncuesta(listaEncuesta, valoracion){
      this.dialogFormVisible= true;
      this.listaEncuesta = listaEncuesta;
      this.valoracion = valoracion;
      var url = Constantes.rutaencuesta+'preguntas/getpreguntas/1'
        console.log(url)
        axios.get(url).then(response=>{
          console.log(response)
          console.log('examinando listaTipoAtencion');
          var datalist=response.data.data;
          var array=[];
          for(var item of datalist){
            var object = new Object();
            for(let list of this.listaEncuesta){
              if(list.orden == item.orden){
                object.descripcion = item.descripcion;
                object.idEntidadEncuesta = this.idEntidadEncuesta
                object.idPreguntaEncuesta = item.idPreguntaEncuesta;
                if(item.tipoPregunta==2)object.idOpcionPregunta = list.idOpcionPregunta;
                if(item.tipoPregunta==1)object.respuestaLibre = list.respuestaLibre;
                object.tipo = item.tipoPregunta;
                object.orden = item.orden;
                object.nroRespuesta = 1;
                array.push(object);
              }
            }
          }
          this.listQuestions = array;
        }).catch(e=>this.alertUnclose('error',e))
    },
    fabricarExcel(listaExportarExcel){
      var arrays = [];
      for(var valores of listaExportarExcel){
        var objetos = new Object();
        
        objetos['AREA']      = valores.descripcion
        objetos['FECHA']     = valores.fecha
        objetos['HORA']      = valores.hora
          
        objetos['TIPO']      = valores.codigoTipoDocumento  
        objetos['DOCUMENTO'] = valores.dni
        objetos['NOMBRE']    = valores.nombres+" "+valores.apePaterno+" "+valores.apeMaterno
        objetos['TELEFONO']     = valores.telefono
        objetos['DIRECCION']    = valores.direccion
        objetos['CORREO']       = valores.correo

        objetos['MOTIVO']    = valores.motivo

        objetos['CODIGO CITA']  = valores.codigoCita
        if(valores.tipoAtencion == 1)     { objetos['ATENCION']="Presencial"}
        else if(valores.tipoAtencion == 2){ objetos['ATENCION']="Virtual"}
        // objetos['ESTADO']       = valores.indEstado
        switch (valores.indEstado){
          case "1": objetos['ESTADO']="Registrado";
          break;
          case "2": objetos['ESTADO']="Agendado";
          break;
          case "3": objetos['ESTADO']="En Atencion";
          break;
          case "4": objetos['ESTADO']="Atendido";
          break;
          case "5": objetos['ESTADO']="Desestimado";
          break;
          default:  objetos['ESTADO']="SIN ESTADO";
        }
        objetos["REGISTRO TOKEN"] = valores.token.fecha;
        objetos["TOKEN"] = valores.token.idToken;
        objetos["USUARIO TOKEN"] = valores.token.usuario;
        objetos["MOTIVO TOKEN"] = valores.token.motivo;
        if(valores.fec_agenda==null && valores.hor_agenda==null) {objetos["REGISTRO AGENDA"]   = " -"}
        else{objetos["REGISTRO AGENDA"] = valores.fec_agenda + '   ' +valores.hor_agenda}
        objetos["USUARIO AGENDA"] = valores.usu_agenda;
        if(valores.fec_ini_aten==null) {objetos["FECHA ATENCIÓN"]   = " -"}
        else{objetos["FECHA ATENCIÓN"] = valores.fec_ini_aten}
        if(valores.hor_ini_aten==null) {objetos["INICIO ATENCIÓN"]   = " -"}
        else{objetos["INICIO ATENCIÓN"] = valores.hor_ini_aten}
        if(valores.hor_fin_aten==null) {objetos["FIN ATENCIÓN"]   = " -"}
        else{objetos["FIN ATENCIÓN"] = valores.hor_fin_aten}

        switch (valores.indEstado){
          case "4": objetos['ACCION']="Atendido";
          break;
          case "5": objetos['ACCION']="Desestimado";
          break;
          default:  objetos['ACCION']=" ";
        }
        // objetos["USUARIO ATENCIÓN"] = valores.usu_atencion;
        if(valores.usu_atencion==null) {objetos["USUARIO ATENCIÓN"]   = " -"}
        else{objetos["USUARIO ATENCIÓN"] = valores.usu_atencion}

        objetos["MOTIVO ATENCIÓN"] = valores.descripcion_aten;

        arrays.push(objetos)
      }
      this.exportExcelJson = arrays

      console.log('AQUI SE MUESTRA EL OBJETO FABRICADO EN EL METODO')
      console.log(this.exportExcelJson)
    },
    async exportExcel() {
      let listaExportarExcel = [];
      listaExportarExcel = await this.getConsultaExportar();
      console.log(listaExportarExcel);
      console.log("lista mostrada excel export");
      if(listaExportarExcel == undefined){
        alert("LISTA VACIA NO SE PUEDE GENERAR EXCEL")
      } else{
        this.fabricarExcel(listaExportarExcel)
        var wscols = [
          {wch:50},{wch:10},{wch:12},{wch:12},{wch:17},{wch:40},{wch:15},{wch:50},{wch:45},
          {wch:70},{wch:15},{wch:15},{wch:12},{wch:25},{wch:15},{wch:40},{wch:70},{wch:25},
          {wch:35},{wch:20},{wch:20},{wch:20},{wch:20},{wch:40},{wch:70, hidden:false},
        ];
        var wsrows = []
        var objeto = new Object();
        objeto.hpx = 30
        wsrows.push(objeto)
        for( var valor of this.exportExcelJson){
          var objeto = new Object();
          objeto.hpx = 30
          wsrows.push(objeto)
        }

        //si se quiere agregar mas hojas se añade aqui
        let data = XLSX.utils.json_to_sheet(this.exportExcelJson)
        const workbook = XLSX.utils.book_new()
        const filename = 'Lista de Atencion'
        data['!cols'] = wscols;
        data['!rows'] = wsrows;
        
        XLSX.utils.book_append_sheet(workbook, data, filename)
        XLSX.writeFile(workbook, `${filename}.xlsx`)
      }
    },
    excelServicio(){
      let url = Constantes.rutacitas+"excel-citas?1=1";
      this.dniBuscar = this.dniEscribir
      if(this.dniBuscar.length < 1){
        this.dniBuscar= 0
        this.formatCalendar();
      } else if(this.dniBuscar.length > 0){
        this.areaBuscar=0
        this.desdeBuscar=0
      }
      let dni = (this.dniBuscar=="")?"0":this.dniBuscar
      let tipoAtencion = (this.tipoAtencionBuscar=="")?"0":this.tipoAtencionBuscar;
      let area = (this.areaBuscar=="")?"0":this.areaBuscar;
      let estado = (this.estadoAtencion=="")?"0":this.estadoAtencion;
      url = url+"&dni="+dni;
      url = url+"&estado="+estado;
      url = url+"&desdefecha='"+this.desdeBuscar+"'&hastafecha='"+this.hastaBuscar+"'"
      url = url+"&tipoAtencion="+tipoAtencion;
      url = url+"&area="+area;
      url = url+"&encuesta="+this.comboEncuesta;
      window.open(url);
    },
    async getConsultaExportar(){
      this.dniBuscar = this.dniEscribir
      if(this.dniBuscar.length < 1){
        this.dniBuscar= 0
        this.formatCalendar();
      } else if(this.dniBuscar.length > 0){
        this.areaBuscar=0
        this.desdeBuscar=0
      }
      let url = Constantes.rutacitas+"consultabandeja";
      let objetoBuscar = {}
      objetoBuscar.area= this.areaBuscar;
	    objetoBuscar.desdefecha = "'"+this.desdeBuscar+"'";
	    objetoBuscar.hastafecha = "'"+this.hastaBuscar+"'";
	    objetoBuscar.dni = this.dniBuscar;
	    objetoBuscar.estado = this.estadoAtencion;
      objetoBuscar.tipoAtencion = this.tipoAtencionBuscar;
      let objetoPaginado = {}
      objetoPaginado.indice = null
      objetoPaginado.limite = null
      objeto.encuesta = this.comboEncuesta
      objetoBuscar.paginado = objetoPaginado
      console.log("exportando excel consultand");
      console.log(url);
      console.log(objetoBuscar)
      let array = [];
      await axios.post(url, objetoBuscar).then(response=>{
        console.log(response);
        var objeto = response.data.data;
        console.log('Examinando getConsulta')
        console.log(objeto);
        switch(this.comboEncuesta){
          case 1: 
            for(var item of objeto){
              if(item.listRespuesta!= null && item.listRespuesta!=0){
                array.push(item);
                console.log(item);
              }
            }
            break;
          case 2: 
            for(var item of objeto){
              if(item.listRespuesta== null || item.listRespuesta==0){
                array.push(item);
                console.log(item);
              }
            }
            break;
          default: 
            array = objeto
            console.log("POR DEFECTO"); break;
        }
        this.isLoading=false
      }).catch(e=>console.log(e))
      console.log("retornando array");
      console.log(array);
      return array;
    },
    Refrescar(){
      this.isLoading=true;
      this.areaBuscar= 0;
      this.tipoAtencionBuscar= 0;
      this.estadoAtencion= 0;
      this.comboEncuesta= 0;
      this.dniEscribir= '';
      this.fechasInicio();
      this.metodoconsulta();
    },
    formatCalendar(){
      //  = moment(this.fInicio).format("YYYY-MM-DD")
      //  = moment(this.fFin).format("YYYY-MM-DD")
      this.desdeBuscar = this.fechaRango == null ? '0': moment(this.fechaRango[0]).format('YYYY-MM-DD');
      this.hastaBuscar = this.fechaRango == null ? '0': moment(this.fechaRango[1]).format('YYYY-MM-DD');
    },
    fechasIncio(){
      var date = new Date();
      this.fInicio = new Date(date.getFullYear(), date.getMonth() , 1)
      this.fFin = new Date(date.getFullYear(), date.getMonth()+1 , 0)
    },
    fechasInicio(){
      var date = new Date();
      this.fInicio = new Date(date.getFullYear(), date.getMonth() , 1)
      this.fFin = new Date(date.getFullYear(), date.getMonth()+1 , 0)
      
      var date = new Date();
      let fInicio, fFin;
      fInicio = new Date(date.getFullYear(), date.getMonth() , 1)
      fFin = new Date(date.getFullYear(), date.getMonth()+1 , 0)
      this.fechaRango = [fInicio, fFin];
      this.fInicio = fInicio;
      this.fFin = fFin;
    },
    metodoconsulta(){
      this.dniBuscar = this.dniEscribir
      if(this.dniBuscar.length < 1){
        this.dniBuscar= 0
        this.formatCalendar();
        this.getConsulta()
      } else if(this.dniBuscar.length > 0){
        this.areaBuscar=0
        this.desdeBuscar=0
        this.getConsulta()
      }
    },

    getConsulta(){
      let objetoBuscar = {}
      objetoBuscar.area= this.areaBuscar;
	    objetoBuscar.desdefecha = "'"+this.desdeBuscar+"'";
	    objetoBuscar.hastafecha = "'"+this.hastaBuscar+"'";
	    objetoBuscar.dni = this.dniBuscar;
	    objetoBuscar.estado = this.estadoAtencion;
	    objetoBuscar.tipoAtencion = this.tipoAtencionBuscar;
      let objetoPaginado = {}
      objetoPaginado.indice = this.indice
      objetoPaginado.limite = this.pageSize
      objetoBuscar.encuesta = this.comboEncuesta
      objetoBuscar.paginado = objetoPaginado
      let url = Constantes.rutacitas+"consultabandeja"
      console.log(url);
      console.log(objetoBuscar)
      axios.post(url, objetoBuscar).then(response=>{console.log(response);
        var objeto = response.data.data;
        console.log('Examinando getConsulta')
        console.log(objeto);
        this.tokensJson = objeto
        // let array = [];
        // switch(this.comboEncuesta){
        //   case 1: 
        //     for(var item of objeto){
        //       if(item.listRespuesta!= null && item.listRespuesta!=0){
        //         array.push(item);
        //         console.log(item);
        //       }
        //     }
        //     this.tokensJson=array;
        //     break;
        //   case 2: 
        //     for(var item of objeto){
        //       if(item.listRespuesta== null || item.listRespuesta==0){
        //         array.push(item);
        //         console.log(item);
        //       }
        //     }
        //     this.tokensJson=array;
        //     break;
        //   default: 
        //     this.tokensJson = objeto
        //     console.log("POR DEFECTO"); break;
        // }
        this.isLoading=false
      }).catch(e=>console.log(e))
    },
    getAreas(){
      let url =Constantes.rutacitas+'dbAreas/0';
      axios.get(url).then(response=>{
        console.log('examinando getAreas');
        this.listaAreas=response.data.data;
        console.log(this.listaAreas);
      }).catch(e=>console.log(e))
    },
    Visualizar(idCita){
      // this.$router.go({path:"/components/procedimientos/registrarprocedimiento"})
      let routeData = this.$router.resolve({path:'/components/citas/consultadetalle/'+idCita});
      window.open(routeData.href,'_blank');
    },
    //para calendario
    datepickerAbierto: function() {
      console.log('El datepicker ha sido abierto');
    },
    fechaSeleccionada: function() {
      this.$nextTick(() =>{
        var calendario1 = moment(this.fInicio).format('YYYYMMDD');
        var calendario2 = moment(this.fFin).format('YYYYMMDD');
        if(calendario1 > calendario2){
          this.fFin = this.fInicio
          return alert("ERROR AL ELEGIR LAS FECHAS")
        }
      });
    },
    soloNumeros: function(event){
      var key = window.event ? event.which : event.keyCode;
      if(key == 8){
      }else if (key < 48 || key > 57) {
        event.preventDefault();
      }
    },
    alertUnclose(type,e) {
        this.loading=false;
        this.$message({
          message: e,
          center: true, 
          type: type
          });
      },
    alertClose(type,e) {
      this.loading=false;
      this.$message({
        message: e,
        center: true,
        type: type
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
<style lang="scss" scoped>
  .el-col {
    margin-top: 15px;
  }
</style>
<style lang="scss">
  .dialogConsultaEncuesta{
    .el-dialog__header{
      background-color: #f1f2f7 !important;
    }
    .el-dialog__body{
      background-color: #f1f2f7 !important;
    }
    .el-dialog__footer{
      background-color: #f1f2f7 !important;
    }
  }
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
</style>
<style lang="scss" scoped>
  .card-header {
    label {
      font-size: 13px;
      margin: auto;
    }
    .rowmargin {
      margin: 0px;
      padding-left: 0pc;
      padding-right: 0pc;
    }
    i {
      font-size: 18px;
    }
  }
  .puntero1{
    cursor: pointer;
    i {
      font-size: 18px;
    }
  }


  .modalbody{
    padding: 10px;
    width: 800px;
    background: white;
    top: 20%;
    left: 30%;
    box-shadow: 0px 0px 10px black;
    position: absolute;
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

  .intercontent {
    width: 280px;
    margin: -10px;
  }

  h3{
    text-align: center;
    color:white;
  }
  h1{
    font-size: 40px;
    color: darkred;
    font-weight: 900;
  }
  span{
    font: red,
  }

  .derecha {
    float: right;
  }

  .izquierda {
    float: left;
  }

  .clear{
    clear: both;
  }

  .close{
    background: red;
    color:white;
  }

  .my-swal {
    display: -webkit-box;
    display: flex;
    position: fixed;
    z-index: 300000;
  }
  
</style>