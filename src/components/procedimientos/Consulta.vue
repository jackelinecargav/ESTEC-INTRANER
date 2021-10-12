<template>
  <div class="content-wrapper">
    <loading :active.sync="isLoading" :is-full-page="true" color="#007BFF"></loading>
    <titulo-header>Consulta de Procedimientos</titulo-header>
    <section class="content">
      <el-row >
        <div class="card menu">
          <el-row :gutter="10">
            <el-col :xs="24" :lg="3" ><div class="grid-content ">
              <label for="exampleInputPassword1" class="col-form-label" >Uni. Orgánica: </label> </div>
            </el-col>
            <el-col :xs="24" :lg="8" ><div class="grid-content ">
              <template >
                <el-select id="idAreaBucar" filterable :disabled=!permisoSupervisor @change="selectArea()" class="" v-model="areaBuscar">
                <el-option :value="0" label="Seleccionar"></el-option>
                <el-option v-for="areas of listaAreas" :key=areas.idArea :value="areas.idArea" :label="areas.nombreArea"></el-option>
                </el-select>
              </template></div>
            </el-col>

            <el-col :xs="24"  :lg="3"><div class="text-right">
              <label for="exampleInputPassword1" class="col-form-label">Procedimiento: </label> </div>
            </el-col>
            <el-col :xs="24" :lg="10">
              <el-row class="m-0">
              <el-col :lg="21" class="m-0">
                <template >
                  <model-select :options="mapListaTipoTramite" v-model="itemTramite" placeholder="Seleccione un Servicio" >
                  </model-select>
                </template>
              </el-col>
              <el-col :lg="3" class="m-0">
                <el-button class="btn btn-outline-secondary"  @click="itemTramite = 0" ><!-- <img src="../../images/icon_eraser.png" alt="" srcset="" width="15"> -->
                  <img src="../../images/icon_eraser.png" alt="" srcset="" width="25" height="25" style="padding-top: .3rem; padding-bottom: .3rem;"> 
                </el-button>
              </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="10" >
            <template>
              <el-col :xs="24" :lg="3"><div class="grid-content ">
                <label class="col-form-label">Cod. TUPA/TUSNE:</label></div>
              </el-col>
              <el-col :xs="24" :lg="4"><div class="grid-content ">
                <template >
                  <el-input type="text" class="" placeholder="Ingrese Codigo" v-model="numeroDocumentoModelo"/>
                </template></div>
              </el-col>
            </template>
            <template>
              <el-col :xs="24" :lg="2" ><div class="grid-content text-right">
                <label class="col-form-label">Tipo:</label></div>
              </el-col>
              <el-col :xs="24" :lg="4" ><div class="grid-content ">
                <template >
                  <el-select v-model="tipoTupaTusne" placeholder="Seleccione un Usuario">
                    <el-option
                      v-for="item in listTupaTusne"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template></div>
              </el-col>
            </template>
            <template>
              <el-col :xs="24" :lg="2" :xl="2"><div class="grid-content text-right">
                <label class="col-form-label" >Gratuito:</label></div>
              </el-col>
              <el-col :xs="24" :lg="3" :xl="3"><div class="grid-content ">
                <template >
                  <el-select v-model="flagPagoBusqueda" placeholder="Seleccione un Usuario">
                    <el-option
                      v-for="item in listGratuito"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template></div>
              </el-col>
            </template>
            <template>
              <el-col :xs="5" :sm="5" :md="5" :lg="2" :xl="2"><div class="grid-content text-right">
                <label class="col-form-label">Estado:</label></div>
              </el-col>
              <el-col :xs="19" :sm="19" :md="19" :lg="4" :xl="3"><div >
                <template>
                  <el-select v-model="estadoReg" placeholder="Seleccione un Usuario">
                    <el-option
                      v-for="item in listEstado"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template></div>
              </el-col>
            </template>
            <!-- <div class="col-sm-4 col-md-2 col-lg-1">
              <button style="width: 100%; "  type="primary" class="button" icon="el-icon-document" @click="exportExcel" >
                Resumen<img src="../../images/excelIcon2.png" alt="" srcset="" width="40" height="25"></button>
            </div> -->
          </el-row>
          <el-row :gutter="10" class=" d-flex justify-content-end">
            <el-col :xs="24" :lg="4" class="text-center">
              <el-button class="btn-block" type="primary" @click="getProcedxNumero()" >Buscar</el-button>
            </el-col>
            <el-col :xs="24" :lg="4" class="text-center">
              <el-button class="btn-block" type="primary" @click="exportExcel" icon="el-icon-document">Resumen</el-button>
            </el-col>
            <el-col :xs="24" :lg="4"  class="text-center">
              <el-button class="btn-block" type="primary" @click="exportConsolidado" icon="el-icon-document">Consolidado</el-button>
            </el-col>
          </el-row>
        </div>            
        <div class="card menu">
          <table id="example2" class="table table-hover table-sm mb-2">
            <thead class="">
              <tr >
                <th width="2%">ID</th>
                <th width="6%">Unid. Orgánica</th>
                <th class="text-center" width="2%">Código</th>              
                <th class="text-center" width="2%">Número</th>  
                <th width="15%">Procedimiento</th>
                <th width="2%" class="text-center">Gratuito </th>
                <th width="2%" class="text-center">BL</th>              
                <th width="2%" class="text-center">TT</th>              
                <th width="2%" class="text-center">PR</th>              
                <th width="2%" class="text-center">
                  <template>
                    TC
                  </template>
                </th>
                <th width="2%" class="text-center">NR</th>  
                <th width="8%"></th>                
              </tr>
            </thead>
            <tbody>
              <tr class="puntero1" title="Dobler click para VER" v-for="proced of procedJson" :key=proced.idTipoTramite v-on:dblclick="Visualizar(proced.idTipoTramite)">
                <td>{{proced.idTipoTramite}}</td>
                <td>{{proced.area.nombreArea}}</td>
                <td v-if="proced.codSubConcepto!=0">{{proced.codigo}}-{{proced.codSubConcepto}}</td>
                <td v-if="proced.codSubConcepto==0" ></td>
                <td class="text-center">
                  <template v-if="proced.tTramite!=null && proced.tTramite!= undefined">{{proced.tTramite.numero}}</template>
                  <template v-else >--</template>
                </td>
                <td>{{proced.nombre}}</td>
                <td class="text-center" v-if="proced.flagRequierePago==true">N</td>
                <td class="text-center" v-else-if="proced.flagRequierePago==false">S</td>
                <td class="text-center" v-if="(longitud(proced.baseLegal)>=8)">S</td>                      
                <td class="text-center" v-if="(longitud(proced.baseLegal)<8)">N</td>                       
                <td class="text-center" v-if="(longitud(proced.tupaTusneDescripcion)>=8)">S</td>                       
                <td class="text-center" v-if="(longitud(proced.tupaTusneDescripcion)<8)">N</td>                       
                <td class="text-center" v-if="(longitud(proced.preguntasFrecuentes)>=8)">S</td>                       
                <td class="text-center" v-if="(longitud(proced.preguntasFrecuentes)<8)">N</td>                                          
                <td class="text-center" v-if="(longitud(proced.tenerEnCuenta)>=8)">S</td>                       
                <td class="text-center" v-if="(longitud(proced.tenerEnCuenta)<8)">N</td>
                <td class="text-center"><label>{{proced.reqTramite.cantidadRequisitos}}</label></td>                      
                <!-- <td ><label>15</label></td>                                            -->
                <td class="text-center">
                  <el-button class="" type="text" v-on:click="AbrirModal( proced.codigo,areaBuscar,proced.idTipoTramite,'0' , estadoReg);"><u>Requisitos</u></el-button>
                </td>                        
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
              :total="(procedJson != null && procedJson != undefined && procedJson.length>0) ? procedJson[0].totalRegistros: 0">
            </el-pagination>
          </div>
          <!-- <div id="ventanaModal" class="contenedor" v-if="showModal"> 
            <div class="modalbody">
              <div class="modalheader" >
                <div class="izquierda" style=" margin: .3rem .3rem;"><h3>Requisitos</h3></div>
                <button class="derecha" @click="showModal=false; " style=" margin: .5rem 0; margin-right: .5rem" v-on:click=" showToken=false;">X</button>
                <div class="clear"></div> 
              </div>  
              <div class="modalcontent">                               
                <div style="line-height: 150%; padding: 10px 0px 0px 0px;">
                  <div class="row" style=" margin: .5rem 0;">
                    <div class="col-1" />
                    
                  </div> 
                    
                  <div class="row" style=" margin: .5rem 0;">
                    <div class="col-sm-3 col-form-label"> 
                      <button  class="btn btn-danger" v-on:click="showModal=false" >Cerrar</button>  
                    </div>
                    <div class="col-sm-7"/>
                  </div>
                </div>                       
              </div>  
            </div>
          </div>     -->
            
        </div>
      </el-row >
    </section>
    <section>
      <template v-if="showModal">
        <el-dialog class="" title="Requisitos" :visible.sync="showModal" >
          <template>
          <el-row :gutter="10">
            <!-- <div class="col-sm-10 " style="padding-left: 0px; !important">    -->
              <table id="example2" class="table table-hover table-sm mb-2" >
                <thead class="text-nowrap">
                  <tr >
                    <th class="text-center" width="2%">Orden</th>
                    <th width="30%">Nombre</th>            
                    <th class="text-center" width="2%">Ayuda</th>
                    <th class="text-center" width="2%">Formato</th>
                    <th class="text-center" width="2%">Obligatorio</th>
                  </tr>
                </thead>
                <tbody cellspacing="0" cellpadding="1" border="1" class="col-12">
                <template v-if="reqJson != null && reqJson.length != 0">
                  <tr class="puntero1" v-for="req of reqJson" :key=req.idRequisitoTramite v-on:click="VerDetalleReq(req.idRequisitoTramite, req.tipoTramite.idTipoTramite)">
                    <td >{{req.orden}}</td>
                    <td >{{req.requisito.nombre}}</td>
                    <td class="text-center" v-if="(longitud(req.ayuda)>=1)">S</td>
                    <td class="text-center" v-if="(longitud(req.ayuda)<1)">N</td>
                    <td class="text-center" v-if="(longitud(req.linkFormato)>=1)">S</td>
                    <td class="text-center" v-if="(longitud(req.linkFormato)<1)">N</td>
                    <td class="text-center" v-if="(req.requisito.flagObligatorio)">S</td>
                    <td class="text-center" v-if="(!req.requisito.flagObligatorio)">N</td>
                  </tr>
                </template>
                <template v-else>
                  <tr class="text-center text-muted"><td colspan="5"><label>Sin datos</label></td></tr>
                </template>
                </tbody>
              </table>
            <!-- </div>  -->
          </el-row>
          </template>
          <span slot="footer" class="dialog-footer">
            <el-button @click="showModal=false">Cerrar</el-button>
            <!-- <el-button type="primary" @click="validarDescripcion(3);" >{{nombreBoton}}</el-button> -->
          </span>
        </el-dialog>
      </template>
    </section>
  </div>
</template>

<script>
import XLSX from 'xlsx'
import axios from 'axios';
import Datepicker from 'vuejs-datepicker';
import Constantes from '../../store/constantes.js';
import VModal from 'vue-js-modal'
import moment from "moment";
import { ModelSelect } from 'vue-search-select'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import TituloHeader from '../comun/TituloHeader';

export default {
  props:[
    'opcion'
  ],
  components: {
    Datepicker,
    ModelSelect,
    VModal,
    TituloHeader, 
    Loading,
  },
  data(){
    return{
      listTupaTusne: [{value: 0,label: 'Todos'}, {value: 1,label: 'TUSNE'}, {value: 2,label: 'TUPA'},{value: 3,label: 'OTROS'}],
      listGratuito: [{value: 0,label: 'Todos'}, {value: 1,label: 'Si'}, {value: 2,label: 'No'}],
      listEstado: [{value: 1,label: 'ACTIVO'}, {value: 2,label: 'INACTIVO'}],
      isLoading:false,

      //Variables antiguas
      isDisabledNega: true,
      //Exportar excel
      exportExcelJson:null,
      resumenJson:null,
      //SELECT DE AREA
      areaBuscar: localStorage.getItem('codUnidadLogueado')*1,
      // Filtros HEADER
      tipoTupaTusne: 0,
      //Select PROCEDIMIENTO
      mapListaTipoTramite:[],
      itemTramite:0,
      listaTipoTramite:null,
      nombreTipoTramite:'',
      flagPagoBusqueda: 0,

      //PARA PINTAR LA TABLA REQUISITOS
      reqJson:null,
      ordenReq: '',
      nombreReq: '',

      //DATOS MODAL
      codigoReg:0,
      idTipoTramite:'',
      idRequisitoTramite:'',
      estadoReg:1,

      //PARA PINTAR TABLA PRINCIPAL
      baseLegal: false,


      certificadosJson:null,
      procedJson:null,
      citasTJson:null,
      listaParametrosAux:null,
      listaEstado:null,
      listaTipoDocumento:null,
      listaAreas:null,
      idTipodocumento:0,
      idEstado:0,
      idProcedimiento:0,
      numeroDocumentoModelo:'',
      numeroExpedienteModelo:'',
      anioExpedienteModelo:'',
      manzanaModelo:'',
      loteModelo:'',
      paginaActual:1,
      pageSize:10,
      pageOptions: [10, 20, 50, 100],
      hide_on_single_page: true,
      
      listaPaginas:null,
      date: new Date,
      codigoCita:0,
      showModal: false,
      showInter: false,
      regBool: false,
      fechaModal:null,
      idCitaModal:0,
      valText:false,
      horaModal:'',
      motivoModal:'',
      dniModal:'',
      nombreModal:'',
      correoModal:'',
      descripcionModal:'',
      descripcionModalD:'',
      responsableModalD:'',
      responsableModal:'',
      minAten:'',
      horaAten:'',
      fecAten:'',
      areaSesion:localStorage.getItem('desUnidadLogueado'),
      usuSesion:localStorage.getItem('cuenta'),
      uniSesion:localStorage.getItem('codUnidadLogueado'),
      idUsuarioLogueado:localStorage.getItem('idUsuarioLogueado'),
      optionBackup: sessionStorage.getItem("idOpcion"),
      permisoLectura: false,
      permisoEscritura: false,
      permisoEspecial: false,
      permisoSupervisor: false,
      permiso:false
    }
  },
  updated(){
      if(this.itemTramiteAnterior!=this.itemTramite){
          this.itemTramiteAnterior=this.itemTramite;
      }
  },
  mounted(){
    if(localStorage.getItem('logueado')=='true'){
      setTimeout(() => { 
        this.permisos();
        console.log(localStorage);  
      }, 500);
      
    }else{
      this.$router.push('/auth/login/');
    }
    
  },
  methods:{
    handleSizeChange(val) {
      console.log(`${val} items per page`);
      this.pageSize = val
      this.getProcedxNumero();
    },
    handleCurrentChange(val) {
      console.log(`current page (pagina actual): ${val}`);
      this.paginaActual = val
      console.log('actual indice' + this.indice)
      this.getProcedxNumero();
    },
    exportConsolidado(){
      const url = Constantes.rutaTramite+'tipotramite/export'
      window.open(url, '_blank')
    },
    permisos(){
      this.opcion = (this.opcion == undefined) ? this.optionBackup : this.opcion;
      var url = Constantes.rutaAccesos+'permiso/getpermisobyid/'+this.opcion+'/'+this.idUsuarioLogueado
      console.log(url)
      if(this.opcion!=undefined || this.optionBackup!=null){
        sessionStorage.setItem('idOpcion', this.opcion);
        axios.get(url).then(response=>{
          var listaAccionSistema=response.data.data;
          console.log("LISTA DE ACCION EN EL SISTEMA");
          console.log(listaAccionSistema);
          for(var item of listaAccionSistema){
            if(item.id73accionsistema ==1) this.permisoLectura = true;
            else if(item.id73accionsistema ==2) this.permisoEscritura=true;
            else if(item.id73accionsistema ==3) this.permisoEspecial=true;
            else if(item.id73accionsistema ==4) this.permisoSupervisor=true;
          }
          this.getResumenArea();
          this.getAreas();
          this.ObtenerTipoTramite(this.nombreTipoTramite);
          this.getProcedxNumero();
        }).catch(e=>console.log(e))
      }else {
        this.Alerta('warning','SELECCIONE UNA OPCIÓN DEL MENÚ','');
        this.$router.push('/components/principal/bienvenido');
      }
    },
    getResumenArea(){
        var url = Constantes.rutaTramite+"areas/resumenAreas"
        console.log(url)
        axios.get(url).then(response=>{
            console.log('examinando listaTipoAtencion');
            this.resumenJson=response.data.data;
            console.log(this.resumenJson);
        }).catch(e=>console.log(e))
    },
    fabricarExcel(){
      var arrays = [];

      for(var valores of this.resumenJson){
        var objetos = new Object();  

        objetos['AREA'] = valores.nombreArea
        objetos['Cantidad'] = valores.cantidad.toFixed(0)
        objetos['Cnt. TUSNE'] =valores.porceTusne.toFixed(0);
        objetos['Cnt. TUPA'] = valores.porceTupa.toFixed(0) ;
        objetos['Cnt. OTROS'] = valores.porceOtros.toFixed(0); 
        objetos['Ingreso Numero'] = (valores.porcIngresoNumero).toFixed(2)
        objetos['Personalizo Nombre%'] = valores.porcePersonalizoNombre.toFixed(2)
        objetos['Personalizo Descripcion%'] = valores.porcePersonalizoDescrip.toFixed(2)
        objetos['Ingreso TUPA/TUSNE%'] = valores.porceIngresoTupaTusne.toFixed(2)
        objetos['Ingreso Baselegal%'] = valores.porceIngresoBaselegal.toFixed(2)
        objetos['Ingreso Pregunta%'] = valores.porceIngresoPregunta.toFixed(2)
        objetos['Ingreso Seccion Tener en Cuenta%'] = valores.porceIngresoTenerEnCuenta.toFixed(2)
        objetos['Ingreso Calificacion Automatico'] = valores.porcIngresoClasificacionAutomatica.toFixed(2)
        objetos['Ingreso Calificacion Positiva/Negativa'] = valores.porcIngresoClasificacionPositivaNegativa.toFixed(2)
        objetos['Ingreso Plazo'] = valores.porcIngresoPlazo.toFixed(2)
        objetos['Ingreso Tiene Requisitos%'] = valores.porceIngresoTieneRequisito.toFixed(2)

        arrays.push(objetos)
      }
      this.exportExcelJson = arrays

      console.log('AQUI SE MUESTRA EL OBJETO FABRICADO EN EL METODO ')
      console.log(this.exportExcelJson)
    },
    exportExcel() {
      // if(this.procedJson == undefined){
      //   alert("LISTA VACIA NO SE PUEDE GENERAR EXCEL")
      // } else{
        this.fabricarExcel()
        var wscols = [
          {wch:50},
          {wch:10},
          {wch:10},
          {wch:10},
          {wch:10},
          {wch:10},
          {wch:18},
          {wch:18},
          {wch:18},
          {wch:18},
          {wch:18},
          {wch:23},
          {wch:25},
          {wch:15},
          {wch:23},
          // {hidden:false, wch:70},
          // {wch:15}
        ];
        var wsrows = [
          {hpx:30},
        ];
        var wsfills = [{ rgb: "FFFFAA00" }]
        //si se quiere agregar mas hojas se añade aqui
        let data = XLSX.utils.json_to_sheet(this.exportExcelJson)
        const workbook = XLSX.utils.book_new()
        const filename = 'Lista de Procedimientos'
        data['!cols'] = wscols;
        data['!rows'] = wsrows;
        data['!fill'] = wsfills;
        XLSX.utils.book_append_sheet(workbook, data, filename)
        XLSX.writeFile(workbook, `${filename}.xlsx`)
      // }
    },
    longitud(palabra){
      if(palabra==null){
        var numero=0
      }else if(palabra==="null"){
        var numero=0
      }else {
        var numero = palabra.length
      }
      // console.log(numero)
      return numero
    },
    selectArea: function() {
      this.ObtenerTipoTramite(this.nombreTipoTramite)
    },
    AbrirModal(codigo,idArea,idTipTramite, idRequisitoTramit, estado){
      this.codigoReg          =codigo;
      this.areaBuscar         =idArea;
      this.idTipoTramite      =idTipTramite;
      this.idRequisitoTramite =idRequisitoTramit;
      this.estadoReg          =estado;
      this.getRequisitosxCod()
      this.showModal=true
    }, 
    getAreas(){
        console.log('AQUI SE MUESTRA LA DATA');
        //var url = Constantes.rutaTramite+"getAreas"
        var url = Constantes.rutaTramite+"tramite-area/1"
        console.log(url)
        axios.get(url).then(response=>{
            console.log('examinando listaTipoAtencion');
             this.listaAreas=response.data;
            if(this.permiso){
              this.isDisabledNega = false;
            }
            console.log(this.listaAreas);
        }).catch(e=>console.log(e))
    },  
    reemplazaVacio(cadena,reemplazo){
      return (cadena=='')?'0':cadena;
    },
    reemplazaVacioEntero(cadena,reemplazo){
      return cadena==''?'0':cadena;
    },
    datosRequisito(){
      for(var req of this.reqJson){
        console.log('AQUI SE LEEN LOS DATOS DEL JSON')
        this.ordenReq = req.orden
        this.nombreReq = req.requisito.nombre
      }
    },
    VerDetalleReq(idRequisito,  idTipoTramite){
      // this.$router.push('/components/requisitos/editarrequisito/'+idRequisito)
      let routeData = this.$router.resolve({path:'/components/procedimientos/verdetallerequisito/'+idRequisito+'/'+idTipoTramite});
      window.open(routeData.href,'_blank'); 
    },
    getRequisitosxCod(){    
      console.log("codido de reg"+this.codigoReg)
      this.codigoReg = ( this.codigoReg=='' ||this.codigoReg==null||this.codigoReg==undefined) ? "0": this.codigoReg;
      var url=Constantes.rutaTramite+'requisito-codigo/'+this.codigoReg+'/'+this.areaBuscar+'/'+this.idTipoTramite+'/0/'+this.estadoReg; 
      //   var url=Constantes.rutaTramite+'requisito-codigo/'+this.codigoReg+'/'+this.areaBuscar+'/9336/0/'+this.estadoReg; 
      console.log(url);  
        axios.get(url)
            .then(response=>{
            this.reqJson=null;
            this.reqJson=response.data.data;
            console.log(this.reqJson);
            var objeto=this.reqJson.data;
            console.log('cantidad de certificados  '+ this.reqJson.length);
            this.datosRequisito()
            
            })
            .catch(e=>console.log(e))      
    },
    getProcedxNumero(){
      if((this.areaBuscar==0)&&(this.numeroDocumentoModelo.length == 0)&&(this.itemTramite==0)){
        alert("DEBE ESCOGER ALMENOS UNA OPCION: Area - TUPA/TUSNE - PROCEDIMIENTO")
        return 
      }
      this.procedJson = null
      let objeto = {}
      objeto.indice = this.paginaActual;
      objeto.limite = this.pageSize;
      objeto.codigo =this.reemplazaVacio(this.numeroDocumentoModelo)
      objeto.idTipoTramite = this.reemplazaVacioEntero(this.itemTramite);
      objeto.estado = this.estadoReg;
      objeto.idUnidadDb2 = this.areaBuscar;
      objeto.flagPagoBusqueda = this.flagPagoBusqueda;
      objeto.tipoTupaTusne = this.tipoTupaTusne;
      //   var url=Constantes.rutaTramite+'tipotramite/procedimiento-codigo/'+localStorage.getItem('codUnidadLogueado')+'/'+this.reemplazaVacio(this.numeroDocumentoModelo)+
      var url=Constantes.rutaTramite+'tipotramite/procedimiento-codigo'
      console.log(url);
      console.log(objeto);
      let indiceBusqueda=this.indice;
      console.log('indiceBusqueda:'+ indiceBusqueda)           
      axios.post(url, objeto).then(response=>{
        console.log(indiceBusqueda)   
        this.indice=indiceBusqueda
        console.log(this.indice)   
        this.procedJson=response.data.data;
        console.log(this.procedJson);
        this.paginaActual = objeto.indice
      }).catch(e=>console.log(e))
    },  
    Visualizar(idProcedimiento){
        // this.$router.go({path:"/components/procedimientos/registrarprocedimiento"})
        let routeData = this.$router.resolve({path:'/components/procedimientos/verreqprocedimiento/'+idProcedimiento});
        window.open(routeData.href,'_blank');
    },      
    PadLeft(value, length) {
            return (value.toString().length < length) ? PadLeft("0" + value, length) : value;
    },
    reemplazaVacio(cadena,reemplazo){
      return cadena==''?'-':cadena;
    },
    reemplazaVacioEntero(cadena,reemplazo){
      return cadena==''?'0':cadena;
    },    
    ObtenerTipoTramite(nombre){
      this.mapListaTipoTramite = []
      this.listaTipoTramite = null
      console.log(Constantes.rutaTramite+'tipotramite/'+this.reemplazaVacio(nombre));
      console.log(Constantes.rutaTramite+'tipotramite/'+this.reemplazaVacio(nombre));
      axios.get(Constantes.rutaTramite+'tipotramite/'+this.reemplazaVacio(nombre)+'/'+this.areaBuscar)
        .then(response=>{
          this.listaTipoTramite=response.data.data;
          console.log('pintando tipotramite')
          console.log(response.data.data);
          console.log(this.listaTipoTramite);
          console.log(this.listaTipoTramite[0].nombre);
          var i=0;
          while(i<this.listaTipoTramite.length){
                var asunto={};
                asunto.value=this.listaTipoTramite[i].idTipoTramite;
                asunto.text=this.listaTipoTramite[i].nombre;
                this.mapListaTipoTramite.push(asunto);
                i++;
            }
            console.log(this.mapListaTipoTramite);
      })
      .catch(e=>console.log(e))
    },
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
  .dateElement{
    .el-input__inner{
      width: 100%;
      max-width:300px;
      min-width:150px;
    }
  }
  .el-tooltip__popper.is-light{
    background-color: #b3d8ff;
    color: #409EFF;
    border: 1px solid #409EFF;
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
  .menu {
    .col-form-label{
      font-size: 13px;
    }
  }
</style>
<style lang="scss" scoped>
  .el-col {
    border-radius: 4px;
    margin-top: 10px;
  }
  .el-select{
    display: inline;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
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

  .modalheader {
    background: #006699;
    margin: -10px;
  }

  .modalbody{
    padding: 5px;
    width: 830px;
    background: white;
    top: 20%;
    left: 30%;
    box-shadow: 0px 0px 5px black;
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
  .puntero1{
    cursor: pointer
  }
  .puntero2{
    cursor: alias;
  }
  .my-swal {
    display: -webkit-box;
    display: flex;
    position: fixed;
    z-index: 300000;
  }
  .tooltip { 
    width: 175px;
    background: #d0edfb;
    color: #49b7ee;
    text-align: center;
    padding: 5px 10px 5px 10px;
    border-radius: 11px;
    bottom: calc(100% + 11px);
    left: 50%;
    transform: translate-x(-50%)
  }
  .tooltip-box { 
    position: relative
  }
  .triangle { 
    border-width: 0 10.5px 6px;
    border-color: transparent;
    border-bottom-color: #d0edfb;
    position: absolute;
    bottom: -6px;
    transform: rotate(180deg) translate-x(-50%);
    left: calc(50% - 21px)
  }
</style>

