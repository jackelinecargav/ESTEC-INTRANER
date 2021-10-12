<template>
  <div class="content-wrapper">
    <loading :active.sync="isLoading" :is-full-page="true" color="#007BFF"></loading>
    <titulo-header>Reporte Estadistico de Citas</titulo-header>
    <section class="content">
      <el-row :gutter="10">
        <div class="card menu">
          <el-row :gutter="10">
            <!-- <template>
              <el-col :md="3">
                <label for="exampleInputPassword1" class="col-md-2 col-form-label font" style="padding: auto; margin-top: auto; margin-bottom: auto">Fecha Inicio</label>
                <div class="col-sm-3" style="padding: auto; margin-top: auto; margin-bottom: auto !important">
                  <datepicker :language="es"  input-class="datepicker text-center"  
                            name="calendarioCitas"  v-model="fechaDesde" >
                  </datepicker>  
                </div>
                
                <label for="exampleInputPassword1" class="col-md-2 col-form-label font text-right" style="padding: auto; padding-right: 0px; margin-top: auto; margin-bottom: auto">Fecha Fin :</label>
                <div class="col-sm-3" style="padding: auto; margin-top: auto; margin-bottom: auto !important">
                  <datepicker :language="es" input-class="datepicker text-center"  
                          name="calendarioCitas"  v-model="fechaHasta" >
                  </datepicker>  
                </div>
              </el-col>
            </template> -->
            <template><!-- DATE PICKER rango-->
              <el-col :md="3" class="text-right">
                <label class="col-form-label">Fecha</label>
              </el-col>
              <el-col :md="7"><div class="dateElement">
                <el-date-picker class="btn-block" v-model="fechaRango" type="daterange" range-separator="a" start-placeholder="Fecha Inicio" end-placeholder="Fecha Fin">
                </el-date-picker></div>
              </el-col>
            </template>
            <el-col :md="6"/>
            <template>
              <el-col :md="4">
                <el-button type="primary" @click="getReporte(); isLoading=true" class="btn-block col-md-12 font">Buscar</el-button>   
              </el-col>
              <el-col :md="4">
                <el-button type="primary" class="btn-block font" icon="el-icon-document" @click="exportExcel()">
                  Exportar</el-button>
              </el-col>
            </template>
          </el-row>
          <!-- <div class="row col-md-12" style="margin: 10px auto 10px">
            <div class="row col-md-7">
              <div class="py-2 col-sm-1  bg-warning" style="margin: auto 0px; "></div>
              <label for="exampleInputPassword1" class="col-sm-5 col-form-label font" style="padding: auto; margin-top: auto; margin-bottom: auto">Registradas por Página Web</label>
              <div class="py-2 col-sm-1  bg-info" style="margin: auto 0px; "></div>
              <label for="exampleInputPassword1" class="col-sm-5 col-form-label font" style="padding: auto; margin-top: auto; margin-bottom: auto">Registradas en Municipalidad</label>
            </div>
          </div> -->
        </div>
        <div class="card menu">
          <table id="example2" class="table table-responsive text-nowrap" width="100%">
            <thead class="">
              <tr>
                <th colspan="2"></th>
                <th class="text-center " colspan="4">Citas Presenciales Registradas por Página Web</th>
                <th class="text-center text-info" colspan="4">Citas Presenciales Registradas en Municipalidad</th>
                <th colspan="1"></th>
                <th class="text-center " colspan="5">Citas Virtuales Registradas por Página Web</th>
                <th class="text-center text-info" colspan="5">Citas Virtuales Registradas en Municipalidad</th>
                <th colspan="1"></th>
              </tr>
              <tr>
                <th class="" scope="col">Id Área</th>
                <th class="text text-center th-lg" scope="col">Unidad Orgánica</th>
                <th class="" scope="col">Registrado</th>
                <th class="" scope="col">Atendido</th>
                <th class="" scope="col">No Atendidos</th>
                <th class="" scope="col">Desestimado</th>
                <th class="text-info" scope="col">Registrado</th>
                <th class="text-info" scope="col">Atendido</th>
                <th class="text-info" scope="col">No Atendidos</th>
                <th class="text-info" scope="col">Desestimado</th>
                <th class="border border-danger text-danger" scope="col">Total Presencial</th>
                <th class="" scope="col">Registrado</th>
                <th class="" scope="col">Agendado</th>
                <th class="" scope="col">Atendido</th>
                <th class="" scope="col">No Atendidos</th>
                <th class="" scope="col">Desestimado</th>
                <th class="text-info" scope="col">Registrado</th>
                <th class="text-info" scope="col">Agendado</th>
                <th class="text-info" scope="col">Atendido</th>
                <th class="text-info" scope="col">No Atendidos</th>
                <th class="text-info" scope="col">Desestimado</th>
                <th class="border border-danger text-danger" scope="col">Total Virtual</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="res of listaEstadistica" :key=res.idArea  >
                <td>{{res.idArea}}</td>
                <td>{{res.nombreArea}}</td>
                <td class="text-center">{{res.registradoWebP}}</td>
                <td class="text-center">{{res.atendidoWebP}}</td>
                <td class="text-center">{{res.noAtendidoWebP+res.enAtencionWebP}}</td>
                <td class="text-center">{{res.desestimadoWebP}}</td>
                <td class="text-center">{{res.registradoMuniP}}</td>
                <td class="text-center">{{res.atendidoMuniP}}</td>
                <td class="text-center">{{res.noAtendidoMuniP+res.enAtencionMuniP}}</td>
                <td class="text-center">{{res.desestimadoMuniP}}</td>
                <td class="text-center">{{res.totalPresencial}}</td>
                <td class="text-center">{{res.registradoWebV}}</td>
                <td class="text-center">{{res.agendadoWebV+res.enAtencionWebV}}</td>
                <td class="text-center">{{res.atendidoWebV}}</td>
                <td class="text-center">{{res.noAtendidoWebV}}</td>
                <td class="text-center">{{res.desestimadoWebV}}</td>
                <td class="text-center">{{res.registradoMuniV}}</td>
                <td class="text-center">{{res.agendadoMuniV+res.enAtencionMuniV}}</td>
                <td class="text-center">{{res.atendidoMuniV}}</td>
                <td class="text-center">{{res.noAtendidoMuniV}}</td>
                <td class="text-center">{{res.desestimadoMuniV}}</td>
                <td class="text-center">{{res.totalVirtual}}</td>
                
              </tr>
            </tbody>
          </table>
        </div>
      </el-row>
    </section>
  </div>
</template>

<script>
import XLSX from 'xlsx'
import VueExcelXlsx from "vue-excel-xlsx";
import Constantes from '../../store/constantes'
import axios from 'axios';

import Datepicker from 'vuejs-datepicker';
import { es } from 'vuejs-datepicker/dist/locale'

import { ModelSelect } from 'vue-search-select'
import TituloHeader from '../comun/TituloHeader'

import moment from "moment";
import Vue from 'vue' 

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

Vue.use(VueExcelXlsx);
export default {
  components:{
    TituloHeader,
    Loading,
    Datepicker,
  },
  data(){
    return{
      fechaRango: null,
      listaEstadistica: null,
      isLoading: true,
      fechaDesde: new Date(),
      fechaHasta: new Date(),
      desdeBuscar: '',
      hastaBuscar:'',
      exportExcelJson:null,
      es:es,
    }
  },
  mounted(){
    if(localStorage.getItem('logueado')=='true'){
      // this.fechasIncio();
      this.fechasInicio(); 
      this.getReporte();
    }else{
      this.$router.push('/auth/login/');
    }
    
  },
  methods:{
    fabricarExcel(){
      // for(i=0; i<=this.tokensJson.length; i++){
      var arrays = [];
      for(var res of this.listaEstadistica){
        var objetos = new Object();
        
        objetos['ID AREA']          = res.idArea
        objetos['AREA']             = res.nombreArea
        objetos['REGISTRADO WEB']   = res.registradoWebP
        objetos['NO ATENDIDO WEB']   = res.noAtendidoWebP+res.enAtencionWebP;
        objetos['ATENDIDO WEB']     = res.atendidoWebP
        objetos['DESESTIMADO WEB']  = res.desestimadoWebP
        objetos['REGISTRADO MUNI']  = res.registradoMuniP
        objetos['NO ATENDIDO MUNI']  = res.noAtendidoMuniP+res.enAtencionMuniP;
        objetos['ATENDIDO MUNI']    = res.atendidoMuniP
        objetos['DESESTIMADO MUNI'] = res.desestimadoMuniP
        objetos['T. PRESENCIAL']    = res.totalPresencial
        objetos['REGISTRADO WEB ']   = res.registradoWebV
        objetos['NO ATENDIDO WEB ']   = res.noAtendidoWebV
        objetos['AGENDADO WEB ']     = res.agendadoWebV+res.enAtencionWebV;
        objetos["ATENDIDO WEB "]     = res.atendidoWebV
        objetos["DESESTIMADO WEB "]  = res.desestimadoWebV
        objetos["REGISTRADO MUNI "]  = res.registradoMuniV
        objetos["NO ATENDIDO MUNI "]  = res.noAtendidoMuniV
        objetos["AGENDADO MUNI "]    = res.agendadoMuniV+res.enAtencionMuniV;
        objetos["ATENDIDO MUNI "]    = res.atendidoMuniV
        objetos["DESESTIMADO MUNI "] = res.desestimadoMuniV
        objetos["T. VIRTUAL"]       = res.totalVirtual

        arrays.push(objetos)
      }
      this.exportExcelJson = arrays

      console.log('AQUI SE ,UESTRA EL OBJETO FABRICADO EN EL METODO GAAAA')
      console.log(this.exportExcelJson)
    },
    exportExcel() {
      if(this.listaEstadistica == undefined){
        this.Alerta('error','LISTA VACIA NO SE PUEDE GENERAR EXCEL','')
      } else{
        this.fabricarExcel()
        var wscols = [
          {wch:10},{wch:50},{wch:20},{wch:20},{wch:16},{wch:20},{wch:20},{wch:20},{wch:16},
          {wch:20},{wch:20},{wch:16},{wch:20},{wch:20},{wch:16},{wch:20},{wch:20},{wch:16},
          {wch:20},{wch:16},{wch:20},{wch:16},{wch:16},{wch:16},
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
        const filename = 'Reporte Estadistico'
        data['!cols'] = wscols;
        data['!rows'] = wsrows;
        
        XLSX.utils.book_append_sheet(workbook, data, filename)
        XLSX.writeFile(workbook, `${filename}.xlsx`)
      }
    },
    getReporte(){
      this.formatCalendar()
      console.log(this.desdeBuscar)
      console.log(this.hastaBuscar)
      var url = Constantes.rutacitas+'citas/generarestadistica/'+this.desdeBuscar+'/'+this.hastaBuscar
      console.log(url)
      axios.get(url).then(response=>{
        this.listaEstadistica=response.data.lista;
        console.log(this.listaEstadistica);
        this.isLoading=false
      }).catch(e=>this.Alerta('error','Error al cargar Reporte','Comuniquese con GSTI'))
    },
    formatCalendar(){
      // this.desdeBuscar = moment(this.fechaDesde).format("YYYY-MM-DD")
      // this.hastaBuscar = moment(this.fechaHasta).format("YYYY-MM-DD")
      this.desdeBuscar = this.fechaRango == null ? '0': moment(this.fechaRango[0]).format('YYYY-MM-DD');
      this.hastaBuscar = this.fechaRango == null ? '0': moment(this.fechaRango[1]).format('YYYY-MM-DD');
    },
    fechasIncio(){
      var date = new Date();
      this.fechaDesde = new Date(date.getFullYear(), date.getMonth() , 1)
      this.fechaHasta = new Date(date.getFullYear(), date.getMonth()+1 , 0)
    },
    fechasInicio(){
      var date = new Date();
      // this.fInicio = new Date(date.getFullYear(), date.getMonth() , 1)
      // this.fFin = new Date(date.getFullYear(), date.getMonth()+1 , 0)
      
      var date = new Date();
      let fInicio, fFin;
      fInicio = new Date(date.getFullYear(), date.getMonth() , 1)
      fFin = new Date(date.getFullYear(), date.getMonth()+1 , 0)
      this.fechaRango = [fInicio, fFin];
      this.fechaDesde = fInicio;
      this.fechaHasta = fFin;
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
  .font{
      font-size: 15px;
    }
  .paddinghorizontal{
    padding-left: 0px;
    padding-right: 0px;
  }
  .table{
    overflow-x: scroll;
    max-width: 75vw;
    margin: auto;
  }
  /*.datepicker {
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
    }*/
</style>
<style lang="scss">
  .dateElement{
    .el-input__inner{
      width: 100%;
      min-width:150px;
    }
  }
  .datePick {  
    .el-date-editor.el-input {
      width:100%;
    }
  }
</style>
<style lang="scss" scoped>
  .el-col {
    margin-top: 15px;
  }
</style>