<template>
    <div class="content-wrapper">
    <titulo-header>Trámites STD</titulo-header>
    <section class="content">
      <div class="row">
        <div class="col-12">
          <div class="card menu">
            <div class=" mb-0">
              <div class="row">
                  <div class="form-group col-sm-5">
                    <div class="row">
                        <label for="exampleInputPassword1" class="col-sm-3 col-form-label" style="padding-right: 0px; !important">Tipo Documento</label>
                        <div class="col-sm-8" style="padding-right: 0px; !important"> 
                        <div class="form-group">
                            <select id="ddlTipoDocumento" class="form-control" v-model="id008TipoDocumento">
                            <option value="0">Todos</option>
                            <option v-for="tipoDocumento of lista008TipoDocumento" :key=tipoDocumento.idParametro :value="tipoDocumento.idParametro" >{{tipoDocumento.nombre}}</option>
                            </select>
                        </div>
                        </div>
                    </div>
                  </div>
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
              </div>
              <div class="row">
                <div class="form-group col-sm-5">
                  <div class="row">
                    <label for="exampleInputPassword1" class="col-sm-3 col-form-label" style="padding-right: 0px; !important">Solicitante</label>
                    <div class="col-sm-3" style="padding-right: 0px; !important"> 
                      <div class="form-group">
                        <select id="ddlTipoDocumento" class="form-control" v-model="idTipodocumento">
                          <option value="0">Todos</option>
                          <option v-for="tipoDocumento of listaTipoDocumento" :key=tipoDocumento.idParametro :value="tipoDocumento.idParametro" >{{tipoDocumento.nombre}}</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-5" style="padding-right: 0px; !important">
                        <input type="text" class="form-control" placeholder="Ingrese Documento" v-model="numeroDocumentoModelo">
                    </div>
                  </div>
                </div>
                <div class="form-group col-sm-5">
                  <div class="row">
                    <label for="exampleInputPassword1" class="col-sm-3 col-form-label" style="padding-right: 0px; !important">Tipo Trámite</label>
                    <div class="col-sm-8" style="padding-right: 0px; !important"> 
                      <div class="form-group">
                        <model-select :options="mapListaTipoTramite" v-model="itemTramite"
                              placeholder="Seleccione un Servicio" >
                        </model-select>
                      </div>
                    </div>
              </div>
              
                </div>
            </div>
            <div class="row">
                <div class="form-group col-sm-5">
                    <div class="row">
                    <label for="exampleInputPassword1" class="col-sm-3 col-form-label" style="padding-right: 0px; !important">Estado</label>
                    <div class="col-sm-8" style="padding-right: 0px; !important">
                      <select class="form-control" v-model="idEstado">
                        <option value="0">Todos</option>
                        <option v-for="estado of listaEstado" :key=estado.idParametro :value="estado.idParametro" >{{estado.nombre}}</option>
                      </select>
                    </div>
                    </div>
                </div>
                <div class="form-group col-sm-5">
                    <div class="row">
                    <label for="exampleInputPassword1" class="col-sm-3 col-form-label" style="padding-right: 0px; !important">Unid. Orgánica</label>
                    <div class="col-sm-8" style="padding-right: 0px; !important">
                      <model-select :options="mapListaUnidadOrganica" v-model="itemUnidadOrganica"
                              placeholder="Seleccione una Unidad" >
                        </model-select>
                    </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-sm-5">
                    <div class="row">
                        <label for="exampleInputPassword1" class="col-sm-3 col-form-label" style="padding-right: 0px; !important">N° Solicitud</label>
                        <div class="col-sm-8" style="padding-right: 0px; !important">
                            <input type="number" class="form-control" placeholder="Ingrese N° Solicitud" v-model="numeroSolicitudModelo">
                        </div>
                        
                    </div>
                  </div>
                <div class="form-group col-sm-5">
                    <div class="row">
                        <label for="exampleInputPassword1" class="col-sm-3 col-form-label" style="padding-right: 0px; !important">Fecha Inicio /Fin</label>
                        <div class="col-sm-4 datePickCustomize" style="padding-right: 0px; !important">
                            <!-- <input type="text" class="form-control" placeholder="Fecha Inicio" v-model="fechaInicioModelo"> -->
                            <datepicker :language="es" :open-date="date" input-class="datepicker text-center"  
                                      name="calendarioCitas" :format="customFormatter" v-model="fechaInicioModelo" 
                                      @opened="datepickerAbierto" 
                                      @selected="fechaInicioSeleccionada" 
                                      @closed="datepickerInicioCerrado" 
                                      @cleared="valorFechaInicioRemovido" >
                                </datepicker>  
                        </div>
                        <div class="col-sm-4 datePickCustomize" style="padding-right: 0px; !important">
                            <!-- <input type="text" class="form-control" placeholder="Fecha Fin" v-model="fechaFinModelo"> -->
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
                <div class="col-sm-1">
                    <button type="button" @click="getTramites" class="btn btn-primary">Buscar</button>   
                </div>
                <div class="col-sm-1">
                  <button style="width: 100%; "  type="primary" class="btn btn-success" icon="el-icon-document" @click="exportExcel" >
                    Exportar</button>
                </div>
            </div>
            </div>
          </div>
            <!-- /.card-header -->
            <div class="card menu">
              <table id="example2" class="table table-hover table-sm mb-2">
                <thead class="">
                <tr >
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
                  <td v-if="tramite.id011Estado.idParametro==24" >{{tramite.tipoTramite.id008Tipo.abreviatura}}  {{tramite.expedientePosgre.numeroExpediente}} - {{(tramite.fechaAprobacion).substr(0,4)}}</td>
                  <td v-else></td>
                  <td>{{tramite.numeroDocumentoSolicitante}}- {{tramite.nombresSolicitante}}</td> 
                  <td>{{tramite.unidadDestino.uniorgnom}}</td> 
                  <td>{{tramite.tipoTramite.nombre}}</td>
                  <td>{{tramite.tipoTramite.equivalenciaOracle}}</td>
                  <td>{{tramite.fechaPresentacion}}</td>
                  <td>{{tramite.fechaAprobacion}}</td>
                  <td> {{tramite.id011Estado.nombre}} <span :class="obtenerSemaforo(tramite.id011Estado.idParametro,tramite.fechaPresentacionRevision,tramite.fechaPresentacionSubsanacion)"></span></td>
                </tr>
               </tbody>
                <tfoot>
                <tr>
                  
                </tr>
                </tfoot>
              </table>
              <nav aria-label="...">
                <ul class="pagination">
                  <li class="page-item " @click="CambiarPagina(indice-1)">
                    <span class="page-link">Anterior</span>
                  </li>
                  <li v-for="pagina of listaPaginas" :key=pagina.id @click="CambiarPagina(pagina)" class="page-item" :class="{'active':pagina==indice}">
                    <a class="page-link" >{{pagina | pintaPuntos}}</a>
                  </li>
                  <li class="page-item" @click="CambiarPagina(indice+1)">
                    <a class="page-link" >Siguiente</a>
                  </li>
                </ul>
              </nav>
            </div>
            <!-- /.card-body -->
          </div>
          <!-- /.card -->
        </div>
        <!-- /.col -->
      <!-- /.row -->
    </section>
    </div>
</template>
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
import TituloHeader from "../../comun/TituloHeader";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  name:'Plataforma',
  components: {
    ModelSelect,
    Datepicker,
    TituloHeader,
    Loading
  },
  data(){
    return{
      isloading: false,
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
      exportarExcel:null
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
      if(this.tramitesJson == undefined){
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
        var fechaInicio;
        var fechaFin;
        if(this.fechaInicioModelo==null ){
            console.log('entró 1'  + this.fechaInicioModelo);
            fechaInicio = ''
        } else{
            fechaInicio = moment(this.fechaInicioModelo).format('YYYY-MM-DD')
        } 
        if(this.fechaFinModelo ==null){
         fechaFin = ''
        } else{
             fechaFin = moment(this.fechaFinModelo).format('YYYY-MM-DD')
        } 
        //var url=Constantes.rutaTramite+'tramites/0/'+this.idEstado+'/'+this.idTipoTramite + '/' + this.reemplazaVacio(this.numeroDocumentoModelo);
        var url=Constantes.rutaTramite+'tramites-consulta/'+this.reemplazaVacioEntero(this.numeroSolicitudModelo)+'/'+this.idEstado+'/'+this.itemTramite + '/' + this.reemplazaVacio(this.numeroDocumentoModelo)
                +'/'+this.id008TipoDocumento+'/'+this.reemplazaVacio(this.anioExpedienteModelo) 
                +'/'+ this.reemplazaVacio(this.numeroExpedienteModelo)+'/'+this.itemUnidadOrganica
                +'/'+ this.reemplazaVacio(fechaInicio)+'/'+this.reemplazaVacio(fechaFin)
                +'/'+ this.indice+'/'+this.limite;
        console.log('url tramites get:'+ url);
                axios.get(url)
                    .then(response=>{
                    console.log(response);
                    this.fechaLimite=response.data.fechaLimite;
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