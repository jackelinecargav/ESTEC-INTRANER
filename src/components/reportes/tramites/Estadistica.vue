<template>
  <div class="content-wrapper">
    <loading :active.sync="isLoading" :is-full-page="true" color="#007BFF"></loading>
    <titulo-header>Reporte Estadístico</titulo-header>
    <section class="content">
      <el-row>
        <div class="card menu">
          <el-row :gutter="10">
            <!-- <div class="form-group col-sm-9">
              <div class="row">
                  <label for="exampleInputPassword1" class="col-sm-2 col-form-label" style="padding-right: 0px; !important">Fecha Inicio /Fin</label>
                  <div class="col-sm-3" style="padding-right: 0px; !important">
                      <datepicker :language="es" :open-date="date" input-class="datepicker text-center"  
                                name="calendarioCitas" :format="customFormatter" v-model="fechaInicioModelo" 
                                @opened="datepickerAbierto" 
                                @selected="fechaInicioSeleccionada" 
                                @closed="datepickerInicioCerrado" 
                                @cleared="valorFechaInicioRemovido" >
                          </datepicker>  
                  </div>
                  <div class="col-sm-3" style="padding-right: 0px; !important">
                        <datepicker :language="es" :open-date="date" input-class="datepicker text-center"  
                                name="calendarioCitas" :format="customFormatter" v-model="fechaFinModelo" 
                                @opened="datepickerAbierto"  @selected="fechaFinSeleccionada"  @closed="datepickerFinCerrado"  @cleared="valorFechaFinRemovido" >
                          </datepicker>  
                  </div>
              </div>
            </div> -->
            <template>
              <el-col :md="3" class="text-right">
                <label class="col-form-label">Fecha</label>
              </el-col>
              <el-col :md="8"><div class="dateElement">
                <el-date-picker v-model="fechaRango" type="daterange" range-separator="a" start-placeholder="Fecha Inicio" end-placeholder="Fecha Fin">
                </el-date-picker></div>
              </el-col>
            </template>
            <el-col :md="5"/>
            <el-col :md="4">
                <el-button type="primary" @click="getTramites" class="btn-block">Buscar</el-button>   
            </el-col>
            <el-col :md="4">
              <el-button  type="primary" class="btn-block" icon="el-icon-document" @click="exportExcel" >
                Exportar</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="card menu">
          <table id="example2" class="table table-hover table-sm mb-2">
            <thead class="text-nowrap">
            <tr >
              <th colspan="2" style="border-bottom: none"></th>
              <th class="text-center" colspan="3" width="35%" >En Revisión</th>
              <th width="10%" style="text-align:center">Observ</th>
              <th class="" width="10%" style="text-align:center">Desest</th>
              <th width="10%" style="text-align:center">En Trámite</th>
              <th class="text-info" width="10%" style="text-align:center">Total</th>
            </tr>
            <tr >
              <th width="5%">Id Área</th>
              <th class="text-center" width="25%">Unidad Orgánica</th>
              <th class="text-center" width="10%">+0</th>
              <th class="text-center" width="10%">+1</th> 
              <th class="text-center" width="10%">+2</th>
              <th width="10%"></th>
              <th class="" width="10%"></th>
              <th width="10%"></th>
              <th class="text-info" width="10%"></th>
            </tr>
            </thead>
            <tbody class="text-center">
            <tr v-for="tramite of tramitesJson" :key=tramite.idArea >
              <!-- <tr v-for="tramite of tramitesJson" :key=tramite.idTramite  -->
              <td class="text-left">{{tramite.idArea}}</td>
              <td class="text-left">{{tramite.unidadOrganica}}</td>
              <td>{{tramite.cantidadRevision}}</td>
              <td>{{tramite.cantidadRevision1}}</td>
              <td>{{tramite.cantidadRevision2}}</td>
              <td>{{tramite.cantidadObservados}}</td>
              <td>{{tramite.cantidadDesestimados}}</td>
              <td>{{tramite.cantidadEnTramite}}</td>
              <td>{{tramite.cantidadEnTramite + tramite.cantidadRevision + 
                    tramite.cantidadObservados + tramite.cantidadDesestimados }}</td>
            </tr>
            </tbody>
            <tfoot>
            <tr>
              
            </tr>
            </tfoot>
          </table>
        </div>
      </el-row>
    </section>
  </div>
</template>
<script>
import XLSX from 'xlsx'
import VueExcelXlsx from "vue-excel-xlsx";   //     prueba 8 y 33
import { es } from 'vuejs-datepicker/dist/locale'
import axios from 'axios';
import Datepicker from 'vuejs-datepicker';
import Constantes from '../../../store/constantes.js';
import { ModelSelect } from 'vue-search-select'
import moment from "moment";
import Vue from 'vue'   //     prueba 8 y 33 y otros
Vue.use(VueExcelXlsx);   //     prueba 8 y 33
import TituloHeader from '../../comun/TituloHeader.vue';
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  name:'Plataforma',
  components: {
    ModelSelect,
    Datepicker,
    TituloHeader,
    Loading,
  },
  data(){
    return{
      fechaRango: null,
      isLoading: false,
      certificadosJson:null,
      tramitesJson:null,
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
      limite:50,
      listaPaginas:null,
      cantidadPaginasBandeja:0,
      lista008TipoDocumento:null,
      id008TipoDocumento:0,
      mapListaTipoTramite:[],
      itemTramite:0,
      mapListaUnidadOrganica:[],
      itemUnidadOrganica:0,
      numeroSolicitudModelo:0,
      date: new Date,
      fechaInicioModelo:null,
      fechaFinModelo:null,
      //fechaDatePicker: new Date, 
      es: es,
      fechaLimite:null,
      exportarExcel:null,
      tipoReporte:0
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
    fabricarExcel(){
      var arrays = [];
      for(var valores of this.tramitesJson){
        var objetos = new Object();
        objetos['idArea']      = valores.idArea;
        objetos['Área']      = valores.unidadOrganica;
        objetos['Revision']      =  valores.cantidadRevision;
        objetos['Revision1']      =  valores.cantidadRevision1;
        objetos['Revision2']      =  valores.cantidadRevision2;
        objetos['Observados']      = valores.cantidadObservados;
        objetos['Desestimados']      = valores.cantidadDesestimados;
        objetos['EnTramite']      = valores.cantidadEnTramite;
        objetos['Total']      = valores.cantidadEnTramite + valores.cantidadRevision 
                              + valores.cantidadObservados + valores.cantidadDesestimados;
        arrays.push(objetos)
      }
      this.exportarExcel = arrays
    },
    exportExcel() {
      if(this.tramitesJson == undefined){
        alert("LISTA VACIA NO SE PUEDE GENERAR EXCEL")
      } else{
        this.fabricarExcel()
        var wscols = [
          {wch:10},{wch:50},{wch:10},{wch:10},{wch:10},{wch:10},{wch:10},{wch:10},
          {wch:10},{wch:10, hidden:false},
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
        clase=diferencia<=0?"succR": diferencia==1? "succN": "succ"
      }
      if(id011Estado==42 && fechaPresentacionSubsanacion!=null){
        var end_date=moment(fechaPresentacionSubsanacion).local().format('YYYY-MM-DD')
        const start = moment(this.fechaLimite);
        const end = moment(end_date);
        diferencia= end.diff(start, 'days');
        clase=diferencia<=0?"succR": diferencia==1? "succN": "succ"
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
    CambiarPagina(pagina){
      if(pagina>0){
        this.indice=pagina;
        this.getTramites();
      }
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
    getTramites(){
        // var fechaInicio;
        // var fechaFin;
        // if(this.fechaInicioModelo==null ){
        //     console.log('entró 1'  + this.fechaInicioModelo);
        //     fechaInicio = ''
        // } else{
        //     fechaInicio = moment(this.fechaInicioModelo).format('YYYY-MM-DD')
        // } 
        // if(this.fechaFinModelo ==null){
        //  fechaFin = ''
        // } else{
        //      fechaFin = moment(this.fechaFinModelo).format('YYYY-MM-DD')
        // } 
        let fechaInicio = this.fechaRango == null ? '': moment(this.fechaRango[0]).format('YYYY-MM-DD');
        let fechaFin = this.fechaRango == null ? '': moment(this.fechaRango[1]).format('YYYY-MM-DD');
        console.log("BUSCANDO FECHA" + fechaInicio)
        var url=Constantes.rutaTramite+'reporte-estadistico/'+ this.reemplazaVacio(fechaInicio)+'/'+this.reemplazaVacio(fechaFin);
        console.log('url tramites get:'+ url);
                axios.get(url)
                    .then(response=>{
                    console.log(response);
                    this.tramitesJson=response.data.data;
                    var objeto=this.tramitesJson.data;
                    
                    this.listaPaginas=null
                    this.listaPaginas=[1];
                    var cantidadPaginas=0;
                    this.cantidadPaginasBandeja=0;
                    
                    if(this.tramitesJson.length>0){
                      
                      cantidadPaginas=Math.ceil(this.tramitesJson[0].totalBandeja/this.limite);
                      this.cantidadPaginasBandeja=cantidadPaginas;
                      
                       var nuevaPagina=2;
                       var primeraPaginaAuxiliar=0;
                       var segundaPaginaAuxiliar=0;
                       if(this.cantidadPaginasBandeja<=10){
                          while(nuevaPagina<=cantidadPaginas) {
                              this.listaPaginas.push(nuevaPagina);
                              nuevaPagina++
                              
                              
                          }
                       }else{
                          while(nuevaPagina<=cantidadPaginas) {
                              
                              if(nuevaPagina<=3){
                                this.listaPaginas.push(nuevaPagina);
                              
                              }else{
                                if((nuevaPagina>this.indice-3 && nuevaPagina<this.indice+3)||nuevaPagina>=this.cantidadPaginasBandeja-3){
                                  this.listaPaginas.push(nuevaPagina);
                              
                                }else{
                                  if(primeraPaginaAuxiliar==0 && nuevaPagina<=this.indice-3){
                                    this.listaPaginas.push(-1);
                                    primeraPaginaAuxiliar=1;
                                  }
                                  if(segundaPaginaAuxiliar==0 && nuevaPagina>=this.indice+3){
                                    this.listaPaginas.push(-1);
                                    segundaPaginaAuxiliar=1;
                                  }
                                }
                              }
                              
                              nuevaPagina++;
                          }
                       }
                       
                    }
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

  .el-col {
    margin-top: 15px;
  }
</style>